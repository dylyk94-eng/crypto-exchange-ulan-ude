# 📱 Mobile Fixes Guide

## Проблема: "криптовалюты" не вмещается на мобильных экранах

### ✅ Решения (от простого к сложному)

#### 1. Использовать готовые CSS классы (рекомендую)

```tsx
// В компонентах используй эти классы:
className="mobile-word-wrap"              // Автоматический перенос длинных слов
className="mobile-adaptive-text"          // Адаптивный размер шрифта
```

#### 2. Tailwind утилиты

```tsx
// Используй эти классы для текста:
className="break-words"     // word-break: break-word
className="break-all"       // word-break: break-all  
className="overflow-hidden" // Скрыть переполнение
```

#### 3. Комбинированное решение (лучшее)

```tsx
<h3 className="text-2xl font-semibold mobile-word-wrap mobile-adaptive-text">
  Покупка и продажа криптовалюты
</h3>
```

---

## 🎯 Примеры использования в компонентах

### Services.tsx
```tsx
<h3 className="text-2xl font-semibold mobile-word-wrap">
  Покупка и продажа криптовалюты
</h3>
```

### Contact.tsx  
```tsx
<h2 className="text-4xl font-semibold mobile-word-wrap">
  Готовы обменять криптовалюту?
</h2>
```

---

## 🔧 Добавленные утилиты

### CSS Classes (глобально)
- `.mobile-word-wrap` — переносы слов на мобильных
- `.mobile-adaptive-text` — адаптивный размер шрифта

### Tailwind Classes
- `word-break-normal`
- `word-break-words` (break-word)
- `word-break-all` (break-all)
- `word-break-keep` (keep-all)

---

## 📊 Что именно делает код

### `.mobile-word-wrap`
```css
word-break: break-word;          // Разрывает слово только если нужно
overflow-wrap: break-word;       // Резервный перенос
hyphens: auto;                  // Автоматический перенос по слогам
```

### `.mobile-adaptive-text`
```css
font-size: clamp(0.85rem, 3vw + 0.5rem, 1rem);  // Адаптивный размер
```

---

## 🚀 Быстрое применение

### Найти места с длинными словами:

```bash
# Поиск в файлах
grep -r "криптовалюты" components/
grep -r "криптовалюту" components/
```

### Применить классы к найденным элементам:

```tsx
// Было:
<h3 className="text-2xl font-semibold">Покупка и продажа криптовалюты</h3>

// Стало:
<h3 className="text-2xl font-semibold mobile-word-wrap mobile-adaptive-text">
  Покупка и продажа криптовалюты
</h3>
```

---

## ✅ Проверка

1. Открой сайт на мобильном устройстве (или через DevTools)
2. Уменьши ширину до 320px (iPhone SE)
3. Проверь что слово "криптовалюты" не обрезается
4. Убедись что текст переносится корректно

---

## 📱 Тестирование в DevTools

1. Открой Chrome DevTools (F12)
2. Включи Device Mode (Ctrl+Shift+M)
3. Выбери iPhone SE или Pixel 2
4. Проверь все элементы с длинными словами

---

**Статус**: ✅ Готово к применению
**Дата**: 03.04.2026
**Автор**: Orchestrator 🎯
