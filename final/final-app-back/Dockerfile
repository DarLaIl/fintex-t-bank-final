FROM python:3.12-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей в контейнер
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем все остальные файлы приложения в контейнер
COPY . .

# Выполняем миграции Alembic (если это нужно при старте)
RUN alembic upgrade head

# Открываем порт, на котором будет работать приложение
EXPOSE 8000

# Запускаем приложение с помощью Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
