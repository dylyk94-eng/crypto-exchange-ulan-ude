# CryptoX — Полный редизайн 2026 🚀

## 🎨 Тренды дизайна 2026

Весь сайт полностью переработан под современные тренды 2026 года:

### ✨ Основные концепции

1. **Bento Grid Layout** — модульная сетка для контента
2. **Glassmorphism Evolved** — улучшенный glass эффект с backdrop blur
3. **Neo-Brutalism Touches** — элементы нео-брутализма
4. **Floating Elements** — плавающие элементы на фоне
5. **Custom Cursor** — кастомный курсор с hover эффектами
6. **Micro-Interactions** — микро-взаимодействия на каждом элементе
7. **Dark Mode First** — тёмная тема как дефолт
8. **Gradient Accents** — градиентные акценты indigo → purple → pink
9. **Smooth Animations** — плавные анимации с stagger эффектом
10. **Noise Texture** — текстура шума для глубины

## 🎯 Ключевые улучшения

### Визуальный стиль

- **Цветовая палитра:**
  - Primary: `#6366f1` (Indigo)
  - Secondary: `#8b5cf6` (Purple)
  - Accent: `#ec4899` (Pink)
  - Background: `#0a0a0f` (Deep black)

- **Эффекты:**
  - Glass blur: 20px / 40px для сильного эффекта
  - Glow: 0 20px 40px rgba(0,0,0,0.3) на hover
  - Gradient text: 135deg indigo → purple → pink
  - Noise texture: 3% opacity для глубины

### Анимации

- **FadeIn:** Плавное появление элементов при скролле
- **Staggered:** Каскадное появление с задержкой 0.1s
- **Floating:** Плавающие orbs (20s ease-in-out infinite)
- **Bg Rotate:** Вращающийся фон (30s linear infinite)
- **Pulse Glow:** Пульсация для live элементов
- **Hover Effects:**
  - Translate Y: -4px на карточках
  - Scale: 1.01 на bento items
  - Shadow: увеличение на hover

### Интерактивность

- **Custom Cursor:**
  - Круг с border: 2px indigo
  - Dot в центре (задержка 50ms для trailing effect)
  - Hover state: scale 1.5 + border color pink

- **Scroll Progress:**
  - Fixed progress bar вверху страницы
  - Gradient: indigo → purple → pink
  - Updates в реальном времени

- **Header:**
  - Sticky positioning
  - Backdrop blur при скролле
  - Animated borders на ссылках

## 📦 Новые компоненты

### CustomCursor.tsx
- Кастомный курсор с trailing dot
- Hover detection для buttons, links, inputs
- Smooth transitions

### AnimatedBackground.tsx
- Floating orbs (3 шт, different sizes/colors)
- Rotating gradient background
- Noise texture overlay

### ScrollProgress.tsx
- Progress bar вверху страницы
- Updates on scroll event
- Gradient animation

### Header.tsx
- Sticky с backdrop blur
- Animated underlines на ссылках
- Logo с glow эффектом

### Hero.tsx
- Bento grid layout (12 columns)
- Live курсы с change indicators
- Statistics cards
- Feature cards (small)

### Cities.tsx
- Large cards с изображениями
- Parallax hover эффект на images
- Asia card с grid features

### Advantages.tsx
- Grid layout (2/3 columns)
- Cards с hover effects
- Large CTA card с glowing orbs

### Contact.tsx
- Office cards с images
- Modern form с glass styling
- Status messages (success/demo/error)

### Footer.tsx
- 4 column layout
- Social links
- Contact information

## 🎨 CSS Classes

### Utility Classes

```css
.glass               /* Glass effect с blur 20px */
.glass-strong        /* Strong glass с blur 40px */
.gradient-text       /* Gradient для текста */
.gradient-text-cyan  /* Cyan gradient */
.card                /* Card с hover */
.btn-primary         /* Primary button */
.btn-secondary       /* Secondary button */
.input-modern        /* Modern input */
.badge               /* Badge с styling */
.badge-hot           /* Hot badge */
.fade-in             /* Animation class */
.floating            /* Floating animation */
```

### Bento Grid

```css
.bento-grid          /* 12 column grid */
.bento-item          /* Item с spacing */
.bento-large         /* span 8 */
.bento-medium        /* span 6 */
.bento-small         /* span 4 */
.bento-tall          /* span 2 rows */
```

### Animation Classes

```css
.fade-in             /* Starts opacity: 0, translateY: 30px */
.fade-in.visible     /* opacity: 1, translateY: 0 */
.stagger-1 to 5      /* Delays 0.1s to 0.5s */
.pulse-glow          /* Pulsing glow animation */
.floating            /* Floating 6s ease-in-out */
```

## 🔧 Технические особенности

### Intersection Observer
- Automatic fade-in animations on scroll
- Threshold: 0.1
- Root margin: -50px (animations start before element)

### Custom Cursor
- Mousemove event listener
- Trailing dot с setTimeout 50ms
- Hover detection for interactive elements

### Scroll Progress
- Window scroll event listener
- Calculate scroll percentage
- Update progress bar width

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (md), 1024px (lg)
- Hamburger menu (hidden on desktop, planned for mobile)

## 📊 Performance

- **Bundle size:** Optimized с tree shaking
- **CSS:** Purged unused styles (Tailwind purge)
- **Animations:** CSS transforms (GPU accelerated)
- **Images:** Lazy loading (planned)
- **Fonts:** Preloaded Inter font

## 🎯 Design Tokens

### Colors
```css
--bg-primary: #0a0a0f
--bg-secondary: #111118
--bg-tertiary: #181820
--text-primary: #ffffff
--text-secondary: rgba(255, 255, 255, 0.7)
--accent-primary: #6366f1
--accent-secondary: #8b5cf6
--accent-tertiary: #ec4899
```

### Spacing
- Container max-width: 7xl (1280px)
- Padding: px-6 (1.5rem)
- Grid gap: 1.5rem
- Card padding: 24px

### Border Radius
- Cards: 20px / 24px (bento)
- Buttons: 12px
- Inputs: 12px
- Badges: 100px (full rounded)

### Transitions
- Default: 0.3s ease
- Fast: 0.2s ease
- Slow: 0.5s ease
- Bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275)

## 🚀 Запуск

```bash
cd crypto-exchange
npm install
npm run dev
```

Откройте **http://localhost:3001**

## 📱 Адаптивность

### Mobile (< 768px)
- Single column grids
- Stacked layouts
- Hidden nav menu (planned)
- Touch-friendly tap targets (44px min)

### Tablet (768px - 1024px)
- 2 column grids
- Medium font sizes
- Nav links hidden on mobile

### Desktop (> 1024px)
- Full grids (12 column)
- Large font sizes
- Full navigation

## 🎨 Типографика

### Font Hierarchy

- **H1:** 5xl (48px) / 6xl (60px) / 7xl (72px)
- **H2:** 4xl (36px) / 5xl (48px)
- **H3:** 2xl (24px) / 3xl (30px)
- **Body:** base (16px) / lg (18px)
- **Small:** sm (14px) / xs (12px)

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Line Heights
- Tight: leading-tight (1.25)
- Normal: leading-none (1.5)
- Relaxed: leading-relaxed (1.75)

## 🔮 Future Improvements

- [ ] Framer Motion integration для сложных анимаций
- [ ] Mobile hamburger menu
- [ ] Loading skeletons
- [ ] Skeleton loaders для images
- [ ] Parallax scrolling
- [ ] 3D elements с Three.js
- [ ] Voice search
- [ ] Dark/Light theme toggle
- [ ] Accessibility improvements (ARIA labels)
- [ ] Performance monitoring
- [ ] A/B testing
- [ ] Analytics integration

## 📝 Заметки

### Cursors
- Кастомный курсор скрыт на touch devices (CSS media query)
- Fallback на default cursor если JS отключен

### Performance
- CSS animations над JS animations
- GPU accelerated transforms
- Debounced scroll events

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid support required
- Backdrop filter support required
- Custom cursor requires pointer-events

---

**Создано:** 21.03.2026
**Версия:** 3.0 (2026 Design Trends)
**Автор:** Коготь 🐾

---

## 🎨 Кредиты

Дизайн вдохновлён:
- Bento Grids из Apple/macOS
- Glassmorphism из iOS
- Vercel design system
- Linear design system
- Stripe design system
- Modern Dribbble trends (2025-2026)
