export const SITE_TITLE = 'Даталог';
export const SITE_DESCRIPTION =
  'Блог о веб-аналитике, SQL, сквозной аналитике и визуализации данных. Практические руководства и кейсы.';
export const SITE_URL = 'https://datalog-blog.vercel.app';
export const AUTHOR_NAME = 'Даталог';
export const TELEGRAM_CHANNEL_URL = 'https://t.me/datalog_blog';
export const TELEGRAM_CHANNEL_NAME = '@datalog_blog';

export const CATEGORIES = {
  sql: {
    label: 'SQL',
    description: 'Запросы, оптимизация, аналитический SQL, ClickHouse',
  },
  'web-analytics': {
    label: 'Веб-аналитика',
    description: 'Яндекс Метрика, Google Analytics, цели, события',
  },
  'data-visualization': {
    label: 'Визуализация данных',
    description: 'DataLens, дашборды, графики, лучшие практики',
  },
  'marketing-analytics': {
    label: 'Маркетинговая аналитика',
    description: 'Сквозная аналитика, атрибуция, воронки, юнит-экономика',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const NAV_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/blog', label: 'Блог' },
  { href: '/about', label: 'О проекте' },
];
