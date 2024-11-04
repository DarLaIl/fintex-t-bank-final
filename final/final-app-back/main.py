from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import jwt
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

app = FastAPI()

origins = [
    "http://localhost:3000",  # ваш фронтенд на Next.js
    # можно добавить другие домены, если нужно
]

# Добавляем CORS middleware с нужными настройками
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # указываем допустимые источники
    allow_credentials=True,           # разрешить отправку cookies и авторизационных данных
    allow_methods=["*"],              # разрешить все HTTP методы
    allow_headers=["*"],              # разрешить все заголовки
)
# Конфигурация JWT
SECRET_KEY = "your_secret_key"  # Используйте более длинный и защищённый ключ
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

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

# Пример защищённого маршрута
@app.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return {"msg": f"Hello, {email}!"}