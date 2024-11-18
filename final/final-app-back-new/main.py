import os
import shutil
from fastapi import FastAPI, Depends, File, HTTPException, UploadFile, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from datetime import date, datetime, timedelta
from typing import List, Optional
import jwt
from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship


app = FastAPI()


origins = [
    "http://localhost:3000",  # Фронтенд на порту 3000
    "http://127.0.0.1:3000", # Альтернативный localhost
]

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешённые домены
    allow_credentials=True,
    allow_methods=["*"],  # Разрешённые HTTP-методы
    allow_headers=["*"],  # Разрешённые HTTP-заголовки
)


# Конфигурация JWT
SECRET_KEY = "your_secret_key"  # Используйте более длинный и защищённый ключ
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 180

# Настройка подключения к базе данных SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Модель пользователя для базы данных
class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    lastname = Column(String, nullable=True)
    avatar = Column(String, nullable=True)

# Модель TaskList
class TaskList(Base):
    __tablename__ = "task_lists"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # Используем строку для типа
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # Связь с UserModel
    
    # Связь с пользователем (создателем TaskList)
    user = relationship("UserModel", back_populates="task_lists")
    
    # Связь с задачами
    tasks = relationship("Task", back_populates="task_list", cascade="all, delete-orphan")

# Модель Task
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    end_date = Column(Date, nullable=False)
    description = Column(String, nullable=True)
    assigned = Column(String, nullable=True)  # Можно хранить ID пользователей как строку, например "1,2,3"
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ID автора
    notification = Column(Boolean, default=False)
    is_completed = Column(Boolean, default=False)
    task_list_id = Column(Integer, ForeignKey("task_lists.id"), nullable=True)  # Ссылка на TaskList
    
    # Связи
    author = relationship("UserModel", back_populates="tasks")  # Создатель задачи
    task_list = relationship("TaskList", back_populates="tasks")  # TaskList, к которому привязана задача

class Comments(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ID автора комментария
    text = Column(String, nullable=False)  # Текст комментария
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False)  # ID задачи, к которой прикреплен комментарий

    # Связи
    author = relationship("UserModel", back_populates="comments")  # Пользователь, который создал комментарий
    task = relationship("Task", back_populates="comments")  # Задача, к которой привязан комментарий
    


UserModel.task_lists = relationship("TaskList", back_populates="user", cascade="all, delete-orphan")
UserModel.tasks = relationship("Task", back_populates="author", cascade="all, delete-orphan")
UserModel.comments = relationship("Comments", back_populates="author", cascade="all, delete-orphan")
Task.comments = relationship("Comments", back_populates="task", cascade="all, delete-orphan")

# Создаем таблицы в базе данных
Base.metadata.create_all(bind=engine)

# Модели для запросов и ответов
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str
    lastname: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    lastname: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

    class Config:
        from_attributes = True

# TaskList схемы
class TaskListCreate(BaseModel):
    name: str
    type: str


class TaskListResponse(BaseModel):
    id: int
    name: str
    type: str

    class Config:
        from_attributes = True


class TaskListUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None


# Task схемы
class TaskCreate(BaseModel):
    name: str
    end_date: date
    description: Optional[str] = None
    assigned: Optional[List[int]] = []
    notification: Optional[bool] = False
    task_list_id: Optional[int] = None

class TaskResponse(BaseModel):
    id: int
    name: str
    end_date: date
    description: Optional[str]
    assigned: List[int]
    author: int
    notification: bool
    is_completed: bool
    task_list_id: Optional[int]
    task_list_name: Optional[str] = None


    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    name: Optional[str] = None
    end_date: Optional[date] = None
    description: Optional[str] = None
    notification: Optional[bool] = None
    iscompleted: Optional[bool] = None


# Comment схемы
class CommentCreate(BaseModel):
    text: str


class CommentResponse(BaseModel):
    id: int
    text: str
    author: int

    class Config:
        from_attributes = True


# Настройка шифрования паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Маршрут для аутентификации
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# Вспомогательные функции
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user_id(token: str, db: Session) -> int:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        user = get_user_by_email(db, email)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user.id
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")



# Функция для получения сессии базы данных
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_by_email(db: Session, email: str):
    return db.query(UserModel).filter(UserModel.email == email).first()



# Ручка для регистрации нового пользователя
@app.post("/register", response_model=dict)
async def register(user: UserRegister, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )
    hashed_password = get_password_hash(user.password)
    new_user = UserModel(
        email=user.email,
        hashed_password=hashed_password,
        name=user.name,
        lastname=user.lastname
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "User registered successfully"}

# Ручка для входа и получения JWT токена
@app.post("/login", response_model=dict)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

#Получить инфо о текущем юзере
@app.get("/users/me", response_model=dict)
async def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    # Расшифровка токена
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    # Поиск пользователя
    db_user = get_user_by_email(db, email)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Формирование ответа без поля "avatar"
    user_data = {
        "id": db_user.id,
        "email": db_user.email,
        "name": db_user.name,
        "lastname": db_user.lastname,
    }
    return user_data

#обновить имя, фамилию, email и пароль
@app.put("/users/me", response_model=dict)
async def update_user(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    # Расшифровка токена
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    # Поиск пользователя в базе данных
    db_user = get_user_by_email(db, email)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Обновление данных
    if user_update.email:
        db_user.email = user_update.email
    if user_update.name:
        db_user.name = user_update.name
    if user_update.lastname:
        db_user.lastname = user_update.lastname
    if user_update.password:
        db_user.hashed_password = get_password_hash(user_update.password)

    db.commit()
    return {"msg": "User updated successfully"}

@app.get("/users", response_model=List[UserResponse])
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(UserModel.id, UserModel.email, UserModel.name).all()
    return [UserResponse(**user._asdict()) for user in users]

#Этот маршрут принимает файл и сохраняет его в директорию avatars
@app.post("/users/me/avatar", response_model=dict)
async def upload_avatar(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    # Расшифровка токена
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    # Поиск пользователя
    db_user = get_user_by_email(db, email)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Сохранение файла
    file_path = os.path.join(f"{db_user.id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Обновление записи в базе данных
    db_user.avatar = file_path
    db.commit()
    return {"msg": "Avatar uploaded successfully"}

#Получение аватара
from fastapi.responses import FileResponse

@app.get("/users/me/avatar")
async def get_avatar(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    db_user = get_user_by_email(db, email)
    if not db_user or not db_user.avatar:
        default_avatar_path = os.path.join(os.getcwd(), "cactus-avatar.png")
        return FileResponse(default_avatar_path)
    
    return FileResponse(db_user.avatar)



@app.post("/tasklists", response_model=TaskListResponse)
async def create_tasklist(
    tasklist: TaskListCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    current_user_id = get_current_user_id(token, db)
    new_tasklist = TaskList(name=tasklist.name, type=tasklist.type, user_id=current_user_id)
    db.add(new_tasklist)
    db.commit()
    db.refresh(new_tasklist)
    return new_tasklist


@app.get("/tasklists", response_model=List[TaskListResponse])
async def get_tasklists(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user_id = get_current_user_id(token, db)
    tasklists = db.query(TaskList).filter(TaskList.user_id == current_user_id).all()
    return tasklists


@app.put("/tasklists/{task_list_id}", response_model=TaskListResponse)
async def update_tasklist(
    task_list_id: int, updates: TaskListUpdate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    current_user_id = get_current_user_id(token, db)
    tasklist = db.query(TaskList).filter(TaskList.id == task_list_id, TaskList.user_id == current_user_id).first()
    if not tasklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TaskList not found")
    if updates.name:
        tasklist.name = updates.name
    if updates.type:
        tasklist.type = updates.type
    db.commit()
    db.refresh(tasklist)
    return tasklist


@app.options("/tasklists/{task_list_id}")
async def options_tasklist():
    return JSONResponse(status_code=200)


@app.delete("/tasklists/{task_list_id}", response_model=dict)
async def delete_tasklist(task_list_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user_id = get_current_user_id(token, db)
    tasklist = db.query(TaskList).filter(TaskList.id == task_list_id, TaskList.user_id == current_user_id).first()
    if not tasklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TaskList not found")
    db.query(Task).filter(Task.task_list_id == task_list_id).delete()
    db.query(Comments).filter(Comments.task_id.in_([task.id for task in tasklist.tasks])).delete()
    db.delete(tasklist)
    db.commit()
    return {"msg": "TaskList deleted successfully"}

@app.post("/tasks", response_model=TaskResponse)
async def create_task(task: TaskCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user_id = get_current_user_id(token, db)

    # Проверка существования TaskList, если task_list_id указан
    if task.task_list_id:
        task_list = db.query(TaskList).filter(
            TaskList.id == task.task_list_id, TaskList.user_id == current_user_id
        ).first()
        if not task_list:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="TaskList not found or does not belong to the user"
            )

    # Создание новой задачи
    new_task = Task(
        name=task.name,
        end_date=task.end_date,
        description=task.description,
        assigned=",".join(map(str, task.assigned)) if task.assigned else None,  # Преобразуем список в строку
        author_id=current_user_id,
        notification=task.notification,
        is_completed=False,  # Указываем значение по умолчанию
        task_list_id=task.task_list_id,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    # Возвращаем корректный результат
    return TaskResponse(
        id=new_task.id,
        name=new_task.name,
        end_date=new_task.end_date,
        description=new_task.description,
        assigned=list(map(int, new_task.assigned.split(","))) if new_task.assigned else [],
        author=new_task.author_id,  # Здесь используем author_id, а не объект UserModel
        notification=new_task.notification,
        is_completed=new_task.is_completed,
        task_list_id=new_task.task_list_id,
    )

@app.get("/tasks/author", response_model=List[TaskResponse])
async def get_author_tasks(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user_id = get_current_user_id(token, db)

    # Запрос задач с именем TaskList
    tasks = (
        db.query(
            Task.id,
            Task.name,
            Task.end_date,
            Task.description,
            Task.assigned,
            Task.author_id.label("author"),
            Task.notification,
            Task.is_completed,
            Task.task_list_id,
            TaskList.name.label("task_list_name")  # Имя TaskList
        )
        .join(TaskList, Task.task_list_id == TaskList.id, isouter=True)
        .filter(Task.author_id == current_user_id)
        .all()
    )
    formatted_tasks = []
    for task in tasks:
        assigned = (
            list(map(int, task.assigned.split(","))) if task.assigned else []
        )  # Преобразуем строку в список
        formatted_tasks.append(
            TaskResponse(
                id=task.id,
                name=task.name,
                end_date=task.end_date,
                description=task.description,
                assigned=assigned,
                author=task.author,
                notification=task.notification,
                is_completed=task.is_completed,
                task_list_id=task.task_list_id,
                task_list_name=task.task_list_name,
            )
        )

    return formatted_tasks


@app.get("/tasks/assigned", response_model=List[TaskResponse])
async def get_assigned_tasks(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user_id = get_current_user_id(token, db)
    tasks = db.query(Task).filter(Task.assigned.contains([current_user_id])).all()
    return tasks


@app.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int, updates: TaskUpdate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    current_user_id = get_current_user_id(token, db)
    task = db.query(Task).filter(Task.id == task_id, Task.author == current_user_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


@app.delete("/tasks/{task_id}", response_model=dict)
async def delete_task(task_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user_id = get_current_user_id(token, db)
    task = db.query(Task).filter(Task.id == task_id, Task.author == current_user_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    db.query(Comments).filter(Comments.task_id == task_id).delete()
    db.delete(task)
    db.commit()
    return {"msg": "Task deleted successfully"}

@app.post("/comments/{task_id}", response_model=CommentResponse)
async def create_comment(
    task_id: int, comment: CommentCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    current_user_id = get_current_user_id(token, db)
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    new_comment = Comments(author_id=current_user_id, text=comment.text, task_id=task_id)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


@app.get("/comments/{task_id}", response_model=List[CommentResponse])
async def get_comments(task_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comments).filter(Comments.task_id == task_id).all()
    return comments


@app.delete("/comments/{comment_id}", response_model=dict)
async def delete_comment(comment_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user_id = get_current_user_id(token, db)
    comment = db.query(Comments).filter(Comments.id == comment_id, Comments.author_id == current_user_id).first()
    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    db.delete(comment)
    db.commit()
    return {"msg": "Comment deleted successfully"}
