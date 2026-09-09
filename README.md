# Control Stroy

Статический сайт на HTML, CSS и JavaScript. Проект можно публиковать через GitHub Pages, Netlify или любой другой сервис статического хостинга.

## Структура

```text
.
├── assets/
│   ├── css/style.css
│   ├── images/favicon.svg
│   └── js/main.js
├── 404.html
├── index.html
└── netlify.toml
```

## Локальный запуск

Самый простой вариант — открыть `index.html` в браузере. Для разработки удобнее запустить локальный сервер:

```bash
npx serve .
```

## GitHub

```bash
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Перед последними двумя командами создайте пустой репозиторий на GitHub и замените адрес на свой.

## Netlify

1. Импортируйте GitHub-репозиторий в Netlify.
2. Build command оставьте пустой.
3. Publish directory укажите `.`.
4. Нажмите Deploy.

Файл `netlify.toml` уже содержит каталог публикации и базовые HTTP-заголовки безопасности.
