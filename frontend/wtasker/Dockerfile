# Указываем базовый образ с Node.js
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Используем легкий сервер для обслуживания статических файлов
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=build /frontend/build /usr/share/nginx/html

# Указываем, что приложение будет слушать на порту 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
