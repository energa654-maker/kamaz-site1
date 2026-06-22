# Деплой сайта на Vercel

## Что уже подготовлено

- `vercel.json` направляет главную страницу и все статические файлы из папки `client`.
- `/api/*` направляется в serverless-функцию `api/index.js`.
- `server/server.js` работает локально и экспортирует Express-приложение для Vercel.
- `.env` добавлен в `.gitignore`, чтобы пароль от базы не попал в репозиторий.

## Как выложить через vercel.com

1. Зайти на https://vercel.com и войти в аккаунт.
2. Создать новый проект через `Add New...` -> `Project`.
3. Подключить репозиторий с папкой `kamaz-site`.
4. В настройках проекта выбрать:
   - Framework Preset: `Other`;
   - Build Command: оставить пустым;
   - Output Directory: оставить пустым;
   - Install Command: `npm install`.
5. В `Environment Variables` добавить переменную:
   - `DATABASE_URL` - строка подключения PostgreSQL.
6. Нажать `Deploy`.

## После деплоя проверить

- Главная страница: `/`
- Каталог: `/pages/catalog.html`
- API заявок: `/api/leads`
- API техники: `/api/vehicles`

Если заявки не отправляются, сначала проверить переменную `DATABASE_URL` в Vercel.
