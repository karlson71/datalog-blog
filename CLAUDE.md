# Даталог — CLAUDE.md

## Что это

**Даталог** — персональный блог специалиста по маркетинговой аналитике. Название: data + лог (блог/журнал). Цель — привлекать подписчиков из органического поиска (Яндекс, Google) и конвертировать в Telegram-канал (@datalog_blog). Контент на русском языке.

- **Сайт:** https://datalog-blog.vercel.app
- **GitHub:** https://github.com/karlson71/datalog-blog
- **Telegram:** https://t.me/datalog_blog (@datalog_blog)
- **Автор/бренд:** Даталог (анонимный экспертный голос, не личный бренд)

## Стек

- **Astro 5** — статический генератор, zero JS по дефолту
- **Tailwind CSS 4** — через `@tailwindcss/vite` (НЕ `@astrojs/tailwind`, он deprecated)
- **MDX** — контент блога (markdown + компоненты)
- **astro-expressive-code** — подсветка синтаксиса с кнопкой копирования
- **TypeScript** — strict mode
- **Деплой:** Vercel (ручной через `vercel --prod`, автодеплой пока не подключён)

## Команды

```bash
npm run dev      # Запуск dev-сервера (http://localhost:4321)
npm run build    # Сборка в ./dist
npm run preview  # Превью сборки
vercel --prod    # Деплой на Vercel + vercel alias ... datalog-blog.vercel.app
```

## Структура проекта

```
src/
├── components/
│   ├── BaseHead.astro         # <head>: мета, OG, шрифты, тема
│   ├── SEO.astro              # JSON-LD structured data
│   ├── Header.astro           # Навигация + мобильное меню + поиск
│   ├── Footer.astro           # Футер: копирайт, TG, RSS
│   ├── ThemeToggle.astro      # Dark/light переключатель
│   ├── SearchDialog.astro     # Мгновенный поиск (⌘K / Ctrl+K)
│   ├── BookmarkButton.astro   # Сохранение статей в localStorage
│   ├── BackToTop.astro        # Кнопка "наверх" при скролле
│   ├── DifficultyBadge.astro  # Уровень: Новичок / Практик / Продвинутый
│   ├── Reactions.astro        # Реакции 🔥💡🤯 (localStorage)
│   ├── ReadingTracker.astro   # Прогресс чтения (сколько прочитано статей)
│   ├── MarkAsRead.astro       # Автоматическая отметка «прочитано» (70% скролла)
│   ├── CopyAsImage.astro      # Копирование блоков кода как картинка (html2canvas)
│   ├── KeyboardNav.astro      # Горячие клавиши: j/k/?/b/ (⌘K поиск)
│   ├── HeroSection.astro      # Главная: hero-блок
│   ├── BlogPostCard.astro     # Карточка поста (с закладкой)
│   ├── PostMeta.astro         # Дата + время чтения + категория
│   ├── CategoryBadge.astro    # Цветной бейдж категории (linked prop!)
│   ├── TableOfContents.astro  # TOC: аккордеон (mobile) / sticky sidebar (desktop)
│   ├── ReadingProgress.astro  # Прогресс-бар скролла
│   ├── TelegramCTA.astro      # CTA подписки (sidebar|inline|bottom варианты)
│   ├── ShareButtons.astro     # Шеринг: Telegram, X, копировать ссылку
│   ├── RelatedPosts.astro     # Похожие статьи (скоринг)
│   ├── Pagination.astro       # Пагинация списка постов
│   └── mdx/                   # Компоненты для использования в MDX-постах
│       ├── VideoEmbed.astro   # YouTube/RuTube с lazy-load
│       ├── Diagram.astro      # Диаграммы с lightbox
│       ├── Screenshot.astro   # Скриншоты (опц. browser chrome mockup)
│       ├── Callout.astro      # Блоки info/warning/tip/danger
│       ├── StepByStep.astro   # Пошаговые инструкции с нумерацией
│       ├── SQLPlayground.astro # Интерактивный SQL-песочница (sql.js WASM)
│       └── TLDR.astro         # Блок «Суть за 30 секунд»
├── content/
│   └── blog/                  # MDX-посты (6 статей)
├── content.config.ts          # Схема коллекции blog (Zod валидация)
├── layouts/
│   ├── BaseLayout.astro       # Корневой layout (html shell)
│   ├── BlogPost.astro         # Layout поста: 2 колонки, TOC, CTA, related
│   └── PageLayout.astro       # Layout для статичных страниц
├── pages/
│   ├── index.astro            # Главная: Hero + посты + категории + TG CTA
│   ├── about.astro            # Страница "О проекте"
│   ├── saved.astro            # Сохранённые статьи (localStorage)
│   ├── rss.xml.ts             # RSS фид
│   ├── og/
│   │   └── [slug].png.ts     # Динамические OG-изображения (satori + resvg)
│   └── blog/
│       ├── [...page].astro          # Пагинированный список постов
│       ├── [...slug].astro          # Динамический роут поста
│       └── category/[category].astro # Фильтр по категории
├── plugins/
│   └── remark-reading-time.mjs  # Remark-плагин: расчёт времени чтения
├── styles/
│   └── global.css             # Tailwind config, dark mode, шрифты, цвета
└── lib/
    ├── constants.ts           # Метаданные сайта, категории, навигация
    └── utils.ts               # formatDate, formatReadingTime, getRelatedPosts
```

## Дизайн-система

- **Тёмная тема по дефолту** (класс `dark` на `<html>`)
- Фон: `zinc-950` (#0a0a0f), карточки: `zinc-900`, бордеры: `zinc-800`
- Акцент: `cyan-400` / `cyan-500`
- Светлая: white bg, `zinc-50` карточки, `teal-600` акцент
- Шрифты: Inter Variable (body), JetBrains Mono (code) — из `/public/fonts/`
- Dark mode переключатель с `localStorage` + `astro:after-swap` для View Transitions

## Категории контента

| Ключ | Метка | Цвет бейджа |
|------|-------|-------------|
| `sql` | SQL | violet |
| `web-analytics` | Веб-аналитика | cyan |
| `data-visualization` | Визуализация данных | emerald |
| `marketing-analytics` | Маркетинговая аналитика | amber |

## Текущие статьи (6 шт.)

1. `metrica-vs-ga4.mdx` — Яндекс Метрика vs GA4 (web-analytics, 2026-03-18)
2. `sql-funnel-analysis.mdx` — Анализ воронки на чистом SQL (sql, 2026-03-17)
3. `utm-hell-fix.mdx` — UTM-разметка: бардак и как починить (marketing-analytics, 2026-03-15)
4. `sql-window-functions.mdx` — Оконные функции SQL (sql, 2026-03-10)
5. `yandex-metrica-ecommerce.mdx` — Ecommerce в Яндекс Метрике (web-analytics, 2026-03-05)
6. `datalens-dashboard-guide.mdx` — Дашборд в DataLens (data-visualization, 2026-02-28)

## Ключевые фичи

- **Мгновенный поиск** — `⌘K` / кнопка лупы, поиск по заголовкам, описаниям, тегам, категориям; подсветка совпадений; навигация стрелками + Enter
- **Закладки** — сохранение статей в localStorage (`datalog_bookmarks`), страница `/saved`, кнопка на карточках и в шапке статьи
- **TOC** — оглавление: мобильный аккордеон + sticky sidebar на десктопе с IntersectionObserver
- **Прогресс чтения** — cyan градиент progress bar
- **Кнопка "Наверх"** — появляется при scrollY > 400
- **Share** — Telegram, X/Twitter, копировать ссылку
- **Related posts** — скоринг: категория +3, совпадающие теги +1
- **MDX-компоненты** — VideoEmbed, Diagram, Screenshot, Callout, StepByStep, SQLPlayground, TLDR
- **SQL Playground** — интерактивная песочница на sql.js (SQLite→WASM), Ctrl/Cmd+Enter запуск, кастомный setup (CREATE/INSERT), таблица результатов
- **Копирование кода как картинка** — html2canvas 2x + циановый watermark «datalog-blog.vercel.app», clipboard API + fallback download
- **Реакции** — 🔥 Полезно, 💡 Узнал новое, 🤯 Вау; localStorage (`datalog_reactions`), псевдо-коммьюнити счётчики
- **Трекер чтения** — прогресс-бар + мотивационные сообщения, MarkAsRead при 70% скролла; localStorage (`datalog_read_posts`)
- **Бейджи сложности** — beginner (Новичок, emerald), intermediate (Практик, cyan), advanced (Продвинутый, violet); на карточках и в шапке поста
- **Динамические OG-изображения** — `/og/[slug].png` через satori + @resvg/resvg-js; тёмный фон, категория, заголовок, бренд
- **Горячие клавиши** — j/k: навигация по постам, /: поиск, b: закладка, ?: оверлей со списком шорткатов

## Как добавить новый пост

Создать файл `src/content/blog/slug-name.mdx`:

```mdx
---
title: "Заголовок поста"
description: "Описание до 160 символов для SEO"
pubDate: 2026-03-18
category: sql
tags: ["sql", "clickhouse"]
difficulty: intermediate  # beginner | intermediate | advanced
draft: false
---

import Callout from '../../components/mdx/Callout.astro';
import TLDR from '../../components/mdx/TLDR.astro';
import SQLPlayground from '../../components/mdx/SQLPlayground.astro';

<TLDR>
- Ключевой пункт 1
- Ключевой пункт 2
</TLDR>

Контент в MDX...

<Callout type="tip" title="Совет">
Текст совета
</Callout>

<SQLPlayground
  title="Попробуй сам"
  setup="CREATE TABLE users (id INT, name TEXT); INSERT INTO users VALUES (1, 'Alice');"
  query="SELECT * FROM users;"
/>
```

## SEO

- Sitemap: `/sitemap-index.xml` (автогенерация через `@astrojs/sitemap`)
- RSS: `/rss.xml`
- JSON-LD: WebSite, BlogPosting, BreadcrumbList схемы
- Open Graph + Twitter Cards в BaseHead.astro
- `robots.txt` в `/public/`
- Русская локаль: `lang="ru"`, `og:locale="ru_RU"`, `i18n.defaultLocale: 'ru'`

## Важные нюансы

- В `astro.config.mjs`: `expressiveCode()` ОБЯЗАТЕЛЬНО перед `mdx()` в массиве integrations
- Tailwind CSS 4 подключается через Vite plugin, НЕ через @astrojs/tailwind
- Тема инициализируется inline-скриптом в `<head>` чтобы избежать FOUC
- View Transitions используют `ClientRouter` из `astro:transitions`
- Content collections используют `glob()` loader (Astro 5 API)
- **CategoryBadge внутри карточек**: передавать `linked={false}` чтобы избежать вложенных `<a>` тегов
- **SearchDialog** рендерится ВНЕ `<nav>` (после `</header>`), иначе скрыт на мобилке
- Деплой: `vercel --prod --yes` + `vercel alias <url> datalog-blog.vercel.app`
- GitHub push: `gh auth setup-git` нужен для HTTPS credentials

## Текущее состояние

- [x] Проект инициализирован и собирается (14 страниц + 6 OG PNG, ~5.9 сек на Vercel)
- [x] 6 статей написаны (с difficulty, TLDR, SQL Playground)
- [x] Адаптивный дизайн (mobile + desktop)
- [x] Dark/light тема работает
- [x] Название: Даталог
- [x] Telegram-канал создан (@datalog_blog с группой обсуждений)
- [x] Git + GitHub (github.com/karlson71/datalog-blog)
- [x] Задеплоен на Vercel (datalog-blog.vercel.app)
- [x] Поиск (⌘K), закладки, back-to-top, MDX-компоненты
- [x] SQL Playground (sql.js WASM)
- [x] Копирование кода как картинка (html2canvas + watermark)
- [x] TLDR «Суть за 30 секунд»
- [x] Реакции (🔥💡🤯)
- [x] Трекер чтения + MarkAsRead (70% скролла)
- [x] Бейджи сложности (Новичок/Практик/Продвинутый)
- [x] Динамические OG-изображения (satori + resvg)
- [x] Горячие клавиши (j/k/b/?//)
- [ ] Автодеплой Vercel ← GitHub (нужно связать аккаунты: vercel.com/account/login-connections)
- [ ] Яндекс.Вебмастер + отправка sitemap
- [ ] Яндекс.Метрика (скрипт за env-переменной)

## Важные зависимости (round 2)

- `sql.js` — SQLite→WASM для SQLPlayground (CDN: cdnjs)
- `html2canvas` — скриншоты блоков кода для CopyAsImage
- `satori` + `@resvg/resvg-js` — генерация OG-изображений (SVG→PNG)

## Custom Elements (client-side)

Все интерактивные компоненты реализованы через паттерн Custom Elements для совместимости с View Transitions (`astro:after-swap`):

| Элемент | Компонент | localStorage ключ |
|---------|-----------|-------------------|
| `<bookmark-btn>` | BookmarkButton.astro | `datalog_bookmarks` |
| `<post-reactions>` | Reactions.astro | `datalog_reactions` |
| `<sql-playground>` | SQLPlayground.astro | — |
| `<reading-tracker>` | ReadingTracker.astro | `datalog_read_posts` |
