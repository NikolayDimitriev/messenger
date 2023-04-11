[![Netlify Status](https://api.netlify.com/api/v1/badges/adfc17c8-641b-4791-97ce-22e87cb8948c/deploy-status)](https://app.netlify.com/sites/candid-malabi-7e182e/deploys) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/NikolayDimitriev/middle.messenger.praktikum.yandex/tests.yml)
[![wakatime](https://wakatime.com/badge/user/9bed01ec-3bba-49db-8995-9dd0f8f8466a/project/aa4b2c95-3c9d-4585-b929-f9f0fce7fb4b.svg)](https://wakatime.com/badge/user/9bed01ec-3bba-49db-8995-9dd0f8f8466a/project/aa4b2c95-3c9d-4585-b929-f9f0fce7fb4b)

# Web Messenger

Учебный проект на курсе Яндекс.Практикум - Мидл Фронтенд-разработчик. 

# Стек

Typescript, Handlebars, Parcel (в конце перенес на Webpack), Mocha, Chai, Stylelint, ESLint, Husky, Docker

# Описание

Веб-мессенджер из нескольких страниц: 
`Чат`: возможность создавать новые чаты, искать пользователей по логину, добавлять и удалять пользователей в чате, подключены WebSocket для работы с real-time сообщениями. 
`Профиль`: возможность просмотра и редактирования данных пользователя (имя, фамилия, имя в чате, почта, логин, номер телефона, аватар), а также смена пароля и выход из аккаунта. 
`Авторизация`: реализованы возможности регистрация и авторизации пользователей с валидацией входных данных.

Написаны тесты для шаблонизатора, роутера, компонент, модуля отправки запросов, API авторизации и нескольких вспомогательных функций. Настроена сборка на Webpack (настроены loader для работы с TS, SCSS, Handlebars), настроен precommit, Docker и размещено все на Yandex.Cloud.

# Основные компоненты

- `Block` - базовый компоненты, от которого наследуются все остальные компоненты
- `EventBus` — управление и подписка на события
- `Router` - класс для перехода по страницам без перезагрузки (SPA)
- `Store` - стейт менеджер
- `HTTPTransport` - класс для взаимодействия с backend
- `WSTransport` - класс для работы с сообщения в чатах, на базе WebSocket

## Ссылки

[Yandex Cloud](https://bban7tnhaqvt8i1mlncn.containers.yandexcloud.net/)

[Netlify](https://candid-malabi-7e182e.netlify.app/)

[Макет](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1)

[Swagger](https://ya-praktikum.tech/api/v2/swagger/#/)

# Установка

- `npm install` — установка зависимостей,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка продакт версии,
- `npm run test` — запуск тестов

# PR по спринтам

- [Sprint 1](https://github.com/NikolayDimitriev/middle.messenger.praktikum.yandex/pull/2)
- [Sprint 2](https://github.com/NikolayDimitriev/middle.messenger.praktikum.yandex/pull/3)
- [Sprint 3](https://github.com/NikolayDimitriev/middle.messenger.praktikum.yandex/pull/4)
- [Sprint 4](https://github.com/NikolayDimitriev/middle.messenger.praktikum.yandex/pull/5)

