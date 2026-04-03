# 🚀 Deployment: GitHub Actions + Vercel

## ✅ Что создано

### GitHub Actions Workflows
- `.github/workflows/deploy.yml` — Продакшен деплой (main branch)
- `.github/workflows/preview.yml` — Preview деплой (Pull Requests)

### Vercel Configuration
- `vercel.json` — Настройки деплоя, headers, redirects
- `.vercelignore` — Исключения для деплоя

### Setup Scripts
- `setup-deploy.sh` — Linux/Mac setup script
- `setup-deploy.ps1` — Windows PowerShell setup script

### Documentation
- `DEPLOYMENT-GUIDE.md` — Полное руководство по деплою
- `README-DEPLOYMENT.md` — Этот файл

---

## 🚀 Быстрый старт (Windows)

```powershell
# 1. Запусти скрипт настройки
.\setup-deploy.ps1

# 2. Следуй инструкциям из скрипта
```

---

## 📋 4 шага к автоматическому деплою

### 1️⃣ Получи Vercel Token
```bash
npx vercel login
npx vercel tokens create
```
Скопируй токен → сохрани!

### 2️⃣ Добавь в GitHub Secrets
1. Открой: https://github.com/dylyk/crypto-exchange-ulan-ude-github/settings/secrets/actions
2. New repository secret
3. Name: `VERCEL_TOKEN`
4. Value: `вставь_токен_из_шага_1`

### 3️⃣ Подключи проект к Vercel
```bash
npx vercel link
```

### 4️⃣ Отправь в GitHub
```bash
git add .
git commit -m "Add GitHub Actions + Vercel deployment"
git push -u origin main
```

---

## 🎯 Как это работает

### Автоматический деплой
```
Push в main → GitHub Actions → Build → Deploy → Vercel → Готово!
```

### Preview деплой
```
Pull Request → GitHub Actions → Build → Preview URL → Проверка
```

---

## 📊 Мониторинг

### GitHub Actions
```
https://github.com/dylyk/crypto-exchange-ulan-ude-github/actions
```

### Vercel Dashboard
```
https://vercel.com/dashboard
```

### Сайт
```
https://crypto-exchange-ulan-ude-github.vercel.app
```

---

## 🔧 Команды

### Ручной деплой (GitHub Actions)
```
GitHub → Actions → Deploy to Vercel → Run workflow
```

### Локальный деплой
```bash
npx vercel --prod
```

### Preview локально
```bash
npx vercel
```

---

## ✅ Преимущества

### GitHub Actions + Vercel
- ✅ **Автоматический деплой** — после каждого push
- ✅ **Preview версии** — для Pull Requests
- ✅ **CI/CD** — автоматический тест и билд
- ✅ **Уведомления** — о статусах деплоя
- ✅ **Rollback** — к предыдущим версиям
- ✅ **HTTPS** — автоматически настроен
- ✅ **CDN** — глобальная доставка контента

---

## 🛠️ Решение проблем

### ❌ "VERCEL_TOKEN not found"
**Решение:** Добавь VERCEL_TOKEN в GitHub Secrets

### ❌ "Build failed"
**Решение:** Проверь локально `npm run build`

### ❌ "Deployment failed"
**Решение:** Посмотри логи в GitHub Actions

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

## 🎉 После первого деплоя

### Настрой домен
```bash
npx vercel domains add cryptoulu.ru
```

### Настрой ENV variables
```bash
npx vercel env add TELEGRAM_BOT_TOKEN production
npx vercel env add TELEGRAM_CHAT_ID production
```

### Настрой уведомлений
- Slack webhook в GitHub Actions
- Email уведомления в Vercel

---

## 📖 Документация

- **Подробное руководство:** `DEPLOYMENT-GUIDE.md`
- **Настройка скриптов:** `setup-deploy.sh` / `setup-deploy.ps1`
- **Vercel конфиг:** `vercel.json`

---

## ✅ Pre-Deploy Checklist

- [x] GitHub Actions созданы
- [x] Vercel конфигурация готова
- [x] `.vercelignore` настроен
- [x] Headers безопасности добавлены
- [x] Setup скрипты созданы
- [x] Документация написана
- [ ] VERCEL_TOKEN добавлен в GitHub Secrets
- [ ] Проект подключен к Vercel
- [ ] Локальный билд успешен (`npm run build`)

---

**Статус:** ✅ Готово к настройке
**Следующий шаг:** Запусти `setup-deploy.ps1` и следуй инструкциям
**Автор:** Orchestrator 🎯

---

## 🚀 Пример работы

### Разработка → Деплой

```bash
# 1. Разработка
git checkout -b feature/new-feature
npm run dev

# 2. Тесты
npm test

# 3. Commit
git add .
git commit -m "Add new feature"

# 4. Push → автоматический деплой на preview
git push origin feature/new-feature

# 5. PR → автоматический preview URL
# → Проверка → Merge → автоматический деплой на production

# 6. Merge → автоматический продакшен деплой
git checkout main
git pull origin main
git push origin main
```

### Результат
- ✅ Разработка в feature branch
- ✅ Preview URL для проверки
- ✅ Автоматический продакшен деплой после merge
- ✅ Rollback если что-то пошло не так

---

**Все готово! Запусти `setup-deploy.ps1` и начни деплоить! 🚀**
