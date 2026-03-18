# Даталог — CLAUDE.md

## Что это

**Даталог** — персональный блог специалиста по маркетинговой аналитике. Название: data + лог (блог/журнал). Цель — привлекать подписчиков из органического поиска (Яндекс, Google) и конвертировать в Telegram-канал (@datalog_blog). Контент на русском языке.

## Стек

- **Astro 5** — статический генератор, zero JS по дефолту
- **Tailwind CSS 4** — через `@tailwindcss/vite` (НЕ `@astrojs/tailwind`, он deprecated)
- **MDX** — контент блога (markdown + компоненты)
- **astro-expressive-code** — подсветка синтаксиса с кнопкой копирования
- **TypeScript** — strict mode

## Команды

```bash
npm run dev      # Запуск dev-сервера (http://localhost:4321)
npm run build    # Сборка в ./dist
npm run preview  # Превью сборки
```

## Структура проекта

```
src/
├── components/       # Astro-компоненты
│   ├── BaseHead.astro       # <head>: мета, OG, шрифты, тема
│   ├── SEO.astro            # JSON-LD structured data
│   ├── Header.astro         # Навигация + мобильное меню
│   ├── Footer.astro         # Футер: копирайт, TG, RSS
│   ├── ThemeToggle.astro    # Dark/light переключатель
│   ├── HeroSection.astro    # Главная: hero-блок
│   ├── BlogPostCard.astro   # Карточка поста в листинге
│   ├── PostMeta.astro       # Дата + время чтения + категория
│   ├── CategoryBadge.astro  # Цветной бейдж категории
│   ├── TableOfContents.astro # TOC: аккордеон (mobile) / sticky sidebar (desktop)
│   ├── ReadingProgress.astro # Прогресс-бар скролла
│   ├── TelegramCTA.astro    # CTA подписки (sidebar|inline|bottom варианты)
│   ├── ShareButtons.astro   # Шеринг: Telegram, X, копировать ссылку
│   ├── RelatedPosts.astro   # Похожие статьи (скоринг)
│   └── Pagination.astro     # Пагинация списка постов
├── content/
│   └── blog/                # MDX-посты (frontmatter + контент)
├── content.config.ts        # Схема коллекции blog (Zod валидация)
├── layouts/
│   ├── BaseLayout.astro     # Корневой layout (html shell)
│   ├── BlogPost.astro       # Layout поста: 2 колонки, TOC, CTA, related
│   └── PageLayout.astro     # Layout для статичных страниц
├── pages/
│   ├── index.astro          # Главная: Hero + посты + категории + TG CTA
│   ├── about.astro          # Страница "Обо мне"
│   ├── rss.xml.ts           # RSS фид
│   └── blog/
│       ├── [...page].astro          # Пагинированный список постов
│       ├── [...slug].astro          # Динамический роут поста
│       └── category/[category].astro # Фильтр по категории
├── plugins/
│   └── remark-reading-time.mjs  # Remark-плагин: расчёт времени чтения
├── styles/
│   └── global.css           # Tailwind config, dark mode, шрифты, цвета
└── lib/
    ├── constants.ts         # Метаданные сайта, категории, навигация
    └── utils.ts             # formatDate, formatReadingTime, getRelatedPosts
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

## Как добавить новый пост

Создать файл `src/content/blog/slug-name.mdx`:

```mdx
---
title: "Заголовок поста"
description: "Описание до 160 символов для SEO"
pubDate: 2026-03-18
category: sql
tags: ["sql", "clickhouse"]
draft: false
---

Контент в MDX...
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

## Текущее состояние

- [x] Проект инициализирован и собирается (`npm run build` — OK, <1 сек)
- [x] 3 демо-поста написаны (SQL, Яндекс Метрика, DataLens)
- [x] Адаптивный дизайн проверен (mobile + desktop)
- [x] Dark/light тема работает
- [ ] Telegram-канал ещё не создан (заглушка `@yourchannel` в constants.ts)
- [ ] Имя автора — заглушка `Автор` в constants.ts
- [ ] Git-репозиторий не инициализирован
- [ ] Не задеплоен на Vercel
- [ ] Яндекс.Вебмастер и Метрика не подключены
- [ ] Домен не настроен (сейчас `analytics-blog.vercel.app` — placeholder)

## Деплой

Планируется на **Vercel**:
- Build command: `npm run build`
- Output directory: `dist`
- Node.js 20+
- Переменная `site` в `astro.config.mjs` — обновить на реальный домен
