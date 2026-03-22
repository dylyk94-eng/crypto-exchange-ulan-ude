# CryptoX — Crypto Exchange 2026 🚀

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-18-black?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css" />
</p>

<p align="center">
  <em>Премиальный криптообмен в Улан-Удэ и Чите с трендовым дизайном 2026 года</em>
</p>

## ✨ Особенности

- 🎨 **Трендовый дизайн 2026** — Bento Grid, Glassmorphism, Neo-Brutalism
- 🚀 **Современный стек** — Next.js 14, React 18, TypeScript, Tailwind CSS
- ⚡ **Live курсы** — Автообновление каждые 30 секунд
- 📱 **Полностью адаптивный** — Mobile-first approach
- 🎯 **Bento Grid layout** — Модульная сетка для контента
- ✨ **Custom cursor** — Интерактивный курсор с hover эффектами
- 🎭 **Плавные анимации** — FadeIn, staggered, floating elements
- 🌊 **Glassmorphism** — Размытие фона с премиальным эффектом
- 📊 **Статистика в реальном времени** — 100K+ транзакций, 98% довольных
- 🌍 **Международные платежи** — Таиланд, Alipay, WeChat, Китай

## 🎨 Дизайн

### Тренды 2026

- **Bento Grid** — Модульная 12-колоночная сетка
- **Glassmorphism Evolved** — Улучшенный glass эффект
- **Neo-Brutalism** — Элементы нео-брутализма
- **Floating Elements** — Плавающие orbs на фоне
- **Custom Cursor** — Кастомный курсор
- **Micro-Interactions** — Микро-взаимодействия
- **Dark Mode First** — Тёмная тема по умолчанию
- **Gradient Accents** — Indigo → Purple → Pink

### Цветовая палитра

```
Primary:   #6366f1 (Indigo)
Secondary: #8b5cf6 (Purple)
Accent:    #ec4899 (Pink)
Background: #0a0a0f (Deep Black)
```

## 🚀 Быстрый старт

```bash
# Клонирование репозитория
git clone <your-repo-url>
cd crypto-exchange

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Билд для продакшена
npm run build

# Запуск продакшен версии
npm start
```

Откройте [http://localhost:3001](http://localhost:3001) в браузере.

## 📂 Структура проекта

```
crypto-exchange/
├── app/
│   ├── api/
│   │   └── submit/
│   │       └── route.ts          # API для обработки формы
│   ├── city/
│   │   └── [slug]/
│   │       └── page.tsx         # Страница города
│   ├── components/
│   │   ├── AnimatedBackground.tsx
│   │   ├── Advantages.tsx
│   │   ├── Cities.tsx
│   │   ├── Contact.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   └── ScrollProgress.tsx
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Главная страница
│   └── globals.css             # Глобальные стили
├── public/                     # Статические файлы
├── .env.local                  # Переменные окружения
├── next.config.js              # Конфигурация Next.js
├── tailwind.config.ts          # Конфигурация Tailwind
└── tsconfig.json               # Конфигурация TypeScript
```

## 🔧 Конфигурация

### Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен
3. Получите Chat ID

Добавьте в `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### Изображения

Положите изображения в `public/`:

```
public/
├── cities/
│   ├── ulan-ude.png
│   ├── chita.png
│   └── asia.png
└── offices/
    ├── ulan-ude-main.png
    └── chita-main.png
```

## 🎯 Компоненты

### CustomCursor
Кастомный курсор с trailing dot и hover эффектами.

### AnimatedBackground
Плавающие orbs и вращающийся градиент на фоне.

### ScrollProgress
Progress bar вверху страницы.

### Header
Sticky хедер с backdrop blur и анимированными ссылками.

### Hero
Bento grid с live курсами, статистикой и feature cards.

### Cities
Карточки городов с parallax эффектом на изображениях.

### Advantages
Grid с преимуществами и большим CTA.

### Contact
Офисы и современная форма заявки.

### Footer
4-колоночный футер с контактами.

## 📊 API

### CryptoCompare API
```ts
GET https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDT&tsyms=RUB
```

### Submit Form API
```ts
POST /api/submit
Content-Type: application/json

{
  "name": "Имя",
  "phone": "+7 999 999 99 99",
  "telegram": "@username",
  "currency": "USDT",
  "amount": "10000",
  "message": "Комментарий"
}
```

## 🎨 Кастомизация

### Изменение цветов

В `app/globals.css`:

```css
:root {
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  --accent-tertiary: #ec4899;
}
```

### Изменение градиентов

```css
.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
}
```

## 📱 Адаптивность

- **Mobile** (< 768px): Single column, stacked layouts
- **Tablet** (768px - 1024px): 2 columns, medium fonts
- **Desktop** (> 1024px): Full grids, large fonts

## 🚀 Деплой

### Vercel

1. Push в GitHub
2. Import в Vercel
3. Add environment variables
4. Deploy!

### Другие платформы

- **Netlify:** Поддерживается
- **Railway:** Поддерживается
- **Docker:** Можно контейнеризировать

## 📝 Лицензия

MIT License

## 👨‍💻 Разработчик

Создано с ❤️ для Crypto Exchange

---

**Версия:** 3.0 (2026 Design Trends)
**Дата:** 21.03.2026
**Автор:** Коготь 🐾
