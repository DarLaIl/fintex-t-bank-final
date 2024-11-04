# Next.js + FastAPI Project

Этот проект состоит из frontend-приложения на [Next.js](https://nextjs.org/) и backend-сервера на [FastAPI](https://fastapi.tiangolo.com/). 
Backend упакован в Docker, что позволяет легко разворачивать и запускать его в контейнере.

## Структура проекта

- `final-app/` — папка с приложением на Next.js.
- `final-app-back/` — папка с API на FastAPI.

## Требования

- Установленный [Docker](https://docs.docker.com/get-docker/).

## Запуск проекта

### Шаг 1. Создание образа для FastAPI

Перейдите в папку final-app-back/ с backend приложением и выполните команду для создания Docker образа:

```bash
docker build -t my_fastapi_app . 
```
Эта команда создаст Docker образ с именем my_fastapi_app.

### Шаг 2: Запуск контейнера для FastAPI
Запустите контейнер, пробросив порт 8000 для доступа к API:

```bash
docker run -d -p 8000:8000 my_fastapi_app  
```
Теперь FastAPI будет доступен на http://localhost:8000.

### Доступ к Swagger-документации FastAPI
Swagger-документация автоматически создаётся FastAPI для всех доступных API-эндпоинтов. Чтобы просмотреть документацию, перейдите по адресу:

Swagger UI: http://localhost:8000/docs

Swagger позволяет протестировать доступные API-методы и просмотреть структуру запросов и ответов.

### Шаг 3: Запуск Next.js
Для запуска Next.js в режиме разработки:

Откройте новую вкладку терминала.
Перейдите в папку final-app/, установите зависимости и запустите сервер:
```bash
cd final-app
npm install
npm run dev
```
Next.js приложение будет доступно на http://localhost:3000.
