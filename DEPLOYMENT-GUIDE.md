# 🚀 GitHub Actions Deployment Guide

## ✅ Созданные файлы

### `.github/workflows/deploy.yml`
- Автоматический деплой на Vercel при push в `main/master`
- Проверка кода, билд, уведомления

### `.github/workflows/preview.yml`
- Preview деплой для Pull Requests
- Комментарий с URL preview версии

### `vercel.json`
- Конфигурация Vercel деплоя
- Headers, redirects, rewrites

### `.vercelignore`
- Исключенные файлы для деплоя

---

## 🔧 Настройка GitHub Secrets

### 1. Получи Vercel Token

```bash
npx vercel login
npx vercel tokens create
```
Скопируй токен → `https://vercel.com/account/tokens`

### 2. Добавь в GitHub Secrets

Перейди: `Settings → Secrets and variables → Actions`

**Обязательно:**
- `VERCEL_TOKEN` — токен Vercel
- `GITHUB_TOKEN` — автоматический (создается GitHub)

**Опционально:**
- `SLACK_WEBHOOK_URL` — Slack уведомления

---

## 📋 Пошаговая настройка

### 1. **Создай репозиторий на GitHub** (если еще нет)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dylyk/crypto-exchange-ulan-ude-github.git
git push -u origin main
```

### 2. **Настрой GitHub Secrets**
1. Открой репозиторий → Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `VERCEL_TOKEN`
4. Value: `твой_токен_vercel`

### 3. **Подключи проект к Vercel**
```bash
cd "C:\Users\dylyk\.openclaw\workspace\crypto-exchange-ulan-ude-github"
npx vercel link
```

### 4. **Переправь изменения**
```bash
git add .
git commit -m "Add GitHub Actions for Vercel deployment"
git push
```

### 5. **Следи за деплоем**
- GitHub → Actions → Deploy to Vercel
- Жми "Run workflow" для ручного деплоя

---

## 🎯 Как это работает

### Автоматический деплой:
1. Push в `main` → GitHub Actions запускается
2. Checkout, install, build
3. Deploy на Vercel
4. Уведомления в Slack/Telegram (если настроены)

### Preview деплой:
1. Создай Pull Request
2. GitHub Actions запускается автоматически
3. Deploy на preview URL
4. Комментарий с URL в PR

---

## 📊 Workflow Статусы

### ✅ Success
- Зеленый галочка → сайт успешно задеплоен
- URL: `https://crypto-exchange-ulan-ude-github.vercel.app`

### ❌ Failed
- Красный крест → ошибка
- Посмотри логи в GitHub Actions

### ⏳ In progress
- Желтый → деплой в процессе

---

## 🚀 Команды деплоя

### Ручной запуск (в GitHub):
```
Actions → Deploy to Vercel → Run workflow
```

### Локальный деплой (альтернатива):
```bash
npx vercel --prod
```

### Preview деплой локально:
```bash
npx vercel
```

---

## 🔍 Проверка деплоя

### 1. Vercel Dashboard
```
https://vercel.com/dashboard
```

### 2. GitHub Actions
```
https://github.com/dylyk/crypto-exchange-ulan-ude-github/actions
```

### 3. Site URL
```
https://crypto-exchange-ulan-ude-github.vercel.app
```

---

## 🛠️ Решение проблем

### ❌ "VERCEL_TOKEN not found"
**Решение:** Добавь `VERCEL_TOKEN` в GitHub Secrets

### ❌ "Build failed"
**Решение:** Проверь локально `npm run build`

### ❌ "Deployment failed"
**Решение:** Проверь логи в GitHub Actions

### ❌ "Project not linked"
**Решение:** Запусти `npx vercel link`

---

## 📱 Preview Workflow

Для каждого Pull Request:

1. Создай PR из `feature` в `main`
2. Автоматически создается preview деплой
3. Комментарий с URL в PR
4. Preview URL удаляется после закрытия PR

---

## ✅ Pre-Deploy Checklist

- [x] GitHub Actions созданы
- [x] Vercel конфигурация готова
- [x] `.vercelignore` настроен
- [x] Headers безопасности добавлены
- [ ] VERCEL_TOKEN добавлен в GitHub Secrets
- [ ] Проект подключен к Vercel
- [ ] Локальный билд успешен (`npm run build`)

---

## 🎉 После первого деплоя

### 1. Настрой домен (если нужно)
```bash
npx vercel domains add cryptoulu.ru
```

### 2. Настрой окружения (ENV variables)
```bash
npx vercel env add TELEGRAM_BOT_TOKEN production
npx vercel env add TELEGRAM_CHAT_ID production
```

### 3. Настрой уведомления
- Slack/Telegram webhook в GitHub Actions
- Email уведомления в Vercel

---

## 📝 Разные окружения

### Production
- Branch: `main`
- URL: `crypto-exchange-ulan-ude-github.vercel.app`
- Авто: при push в `main`

### Preview
- Branch: PR branches
- URL: `crypto-exchange-ulan-ude-github-git-xxx.vercel.app`
- Авто: при создании PR

---

**Статус:** ✅ Готово к настройке
**Следующий шаг:** Добавить VERCEL_TOKEN в GitHub Secrets
**Автор:** Orchestrator 🎯
