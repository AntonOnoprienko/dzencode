# Orders & Products SPA

Это одностраничное приложение (SPA) для управления приходами и продуктами. 
Пользователи могут просматривать список приходов, детализированные сведения о каждом приходе, а также все продукты с возможностью фильтрации по типу. 
Приложение поддерживает регистрацию пользователей, отображение текущих активных сессий в реальном времени и мультиязычный интерфейс.

Приложение реализовано с использованием React.js, Next.js (SSR), TypeScript и Redux, а также включает интеграцию с Socket.io, Chart.js и Google Maps для визуализации данных.


## 📌 Функционал

1. **Navigation Menu**  
   - Переключение между страницами **Orders** и **Products**.
   - Анимация переходов между страницами (с использованием 'framer-motion').

2. **TopMenu**  
   - Отображение текущей даты и времени в реальном времени.
   - Кнопка регистрации открывает модальное окно с регистрационной формой. На клиенте форма валидируется с помощью react-hook-form и Zod. После отправки данные передаются на сервер, где проходят дополнительную проверку через Zod, формируется JWT-токен и информация сохраняется в базу данных с использованием Prisma.
   - Счетчик активных сессий приложения через **Socket.io**.
   - Добавлен языковой переключатель на основе next-intl. Выбор языка сохраняется в cookies и используется в request.ts для корректной локализации запросов и отображения интерфейса.

3. **Orders Page** 
   - Для страницы Orders реализован подход SSR: данные извлекаются из базы через Prisma на сервере, передаются в клиентскую часть, где сериализуются и сохраняются в Redux для дальнейшего локального использования.
   - Список всех приходов (orders) с детализацией:
     - Название прихода
     - Количество продуктов
     - Дата создания в двух форматах
     - Сумма прихода в двух валютах
   - Возможность открыть блок с детальной информацией о приходе и закрыть его.
   - Кнопка удаления прихода открывает подтверждающий попап; удаление происходит локально через Redux.
   - Добавлена возможность просмотра графиков с использованием Chart.js.

4. **Products Page**  
   - Список всех продуктов с фильтром по типу.
   - Для каждого продукта отображаются:
     - Название продукта
     - Тип
     - Даты гарантии
     - Цена в разных валютах
     - Название прихода

5. **Home Page** 
    - В HomePage отображается google-map

## 🛠 Технологии

- **React.js** (последняя версия)
- **Next.js** с SSR
- **TypeScript**
- **Redux** для глобального состояния
- **Framer-motion** для анимации между переключениями страниц
- **Socket.io** для реального времени
- **Bootstrap** и кастомная CSS-архитектура (БЭМ)
- **Fetch** для REST-запросов
- **React-hook-form + Zod** - для форм и валидации
- **i18n** (поддержка мультиязычности)
- **JWT** и WebStorage
- **Lazy Loading** next Dynamic для отделения тяжелых библиотек
- **Charts & Maps** для визуализации данных
- **Docker** для контейнеризации приложения и создания локально db
- **Prettier** для автоматического форматирования кода
- **JEST** для тестов



## 📂 Структура проекта

```
───app
│   │   favicon.ico     
│   │   globals.css
│   │   layout.tsx
│   │   page.tsx
│   │
│   ├───api
│   │   ├───auth
│   │   │   ├───login
│   │   │   └───register
│   │   │           route.ts
│   │   │
│   │   ├───orders
│   │   │       route.ts
│   │   │
│   │   └───products
│   │           route.ts
│   │
│   ├───orders
│   │       page.tsx
│   │
│   └───products
│           page.tsx
│
├───components
│   ├───layout
│   │       index.ts
│   │       NavigationMenu.tsx
│   │       TopMenu.tsx
│   │
│   ├───shared
│   │   │   AnimationWrapper.tsx
│   │   │   DeleteOrderModal.tsx
│   │   │   FormattedDate.tsx
│   │   │   FormattedPrice.tsx
│   │   │   index.ts
│   │   │   LanguageSwitcher.tsx
│   │   │   MyMap.tsx
│   │   │   OrderDetailsPanel.tsx
│   │   │   OrderItem.tsx
│   │   │   OrdersChart.tsx
│   │   │   OrdersList.tsx
│   │   │   ProductItem.test.tsx
│   │   │   ProductItem.tsx
│   │   │   ProductsList.tsx
│   │   │   RegisterForm.tsx
│   │   │   RegisterModal.tsx
│   │   │
│   │   └───dynamics
│   │           AnimationDynamic.tsx
│   │           MapDynamic.tsx
│   │
│   └───ui
│           ActiveSessions.tsx
│           AddButton.tsx
│           DeleteButton.tsx
│           index.ts
│           Logo.tsx
│           SearchInput.tsx
│           SessionPointer.tsx
│           Сlock.tsx
│
├───constants
│   └───schemas
│           auth.ts
│
├───hooks
│       index.ts
│       use-orders.ts
│       use-products.ts
│       use-socket.ts
│       useOrders.test.tsx
│
├───i18n
│       request.ts
│
├───messages
│       en.json
│       ru.json
│
├───services
│       api.ts
│
├───store
│   │   hooks.ts
│   │   providers.tsx
│   │   store.ts
│   │
│   └───slices
│           orders-slice.test.ts
│           orders-slice.ts
│           user-slice.ts
│
├───styles
│   │   index.ts
│   │
│   ├───components
│   │       delete-order-modal.scss
│   │       formatted-date.scss
│   │       formatted-price.scss
│   │       order-details-panel.scss
│   │       order-item.scss
│   │       orders-list.scss
│   │       product-item.scss
│   │       products-list.scss
│   │       register-modal.scss
│   │
│   ├───layouts
│   │       navigation-menu.scss
│   │       top-menu.scss
│   │
│   ├───ui
│   │       search-input.scss
│   │
│   └───utils
├───types
│       index.ts
│
└───utils
        helpers.test.ts
        helpers.ts
```        

## 🚀 Локальный запуск проекта

### 1. Клонирование репозитория

# Клонируем репозиторий
git clone https://github.com/AntonOnoprienko/dzencode.git
cd dzencode

# Устанавливаем зависимости проекта
npm install

# Запускаем локальную базу и сервисы через Docker Compose
docker-compose up -d

# Запуск WebSocket сервера (для счетчика активных сессий)
node socketServer.ts

# Создаем файл .env на основе шаблона

# Пример переменных окружения в .env:
# DATABASE_URL="postgresql://admin:admin@localhost:5432/mydb"
# NEXT_PUBLIC_API_URL=/api
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY  # Получить ключ в Google Cloud Console


# Генерация Prisma Client (создаёт TypeScript клиент для работы с базой)
npx prisma generate

# Применение схемы к базе (создание таблиц)
npx prisma db push

# Если есть seed-файл — заполняем тестовые данные
npx prisma db seed


