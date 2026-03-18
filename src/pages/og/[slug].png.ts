import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { CATEGORIES } from '../../lib/constants';

const CATEGORY_COLORS: Record<string, string> = {
  sql: '#8b5cf6',
  'web-analytics': '#06b6d4',
  'data-visualization': '#10b981',
  'marketing-analytics': '#f59e0b',
};

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string }> = {
  beginner: { label: 'Новичок', color: '#10b981' },
  intermediate: { label: 'Практик', color: '#06b6d4' },
  advanced: { label: 'Продвинутый', color: '#8b5cf6' },
};

async function loadFonts() {
  const fontRegular = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf'
  ).then((res) => res.arrayBuffer());

  const fontBold = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf'
  ).then((res) => res.arrayBuffer());

  return { fontRegular, fontBold };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const { title, category, difficulty } = post.data;

  const categoryColor = CATEGORY_COLORS[category] || '#06b6d4';
  const categoryLabel = CATEGORIES[category as keyof typeof CATEGORIES]?.label || category;
  const difficultyInfo = DIFFICULTY_CONFIG[difficulty || 'intermediate'];

  const { fontRegular, fontBold } = await loadFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0f',
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Cyan accent line at top
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
              },
            },
          },
          // Decorative grid lines
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                opacity: 0.06,
              },
              children: Array.from({ length: 8 }).map((_, i) => ({
                type: 'div',
                props: {
                  key: `h-${i}`,
                  style: {
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#ffffff',
                  },
                },
              })),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0',
                opacity: 0.06,
              },
              children: Array.from({ length: 12 }).map((_, i) => ({
                type: 'div',
                props: {
                  key: `v-${i}`,
                  style: {
                    width: '1px',
                    height: '100%',
                    backgroundColor: '#ffffff',
                  },
                },
              })),
            },
          },
          // Top section with category badge
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '48px 60px 0',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: `${categoryColor}20`,
                      border: `1px solid ${categoryColor}40`,
                      borderRadius: '9999px',
                      padding: '6px 16px',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: categoryColor,
                    },
                    children: categoryLabel,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: `${difficultyInfo.color}20`,
                      border: `1px solid ${difficultyInfo.color}40`,
                      borderRadius: '9999px',
                      padding: '6px 16px',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: difficultyInfo.color,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: difficultyInfo.color,
                          },
                        },
                      },
                      difficultyInfo.label,
                    ],
                  },
                },
              ],
            },
          },
          // Title in center
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                padding: '0 60px',
              },
              children: {
                type: 'div',
                props: {
                  style: {
                    fontSize: title.length > 60 ? '36px' : title.length > 40 ? '42px' : '48px',
                    fontWeight: 700,
                    color: '#fafafa',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                  },
                  children: title,
                },
              },
            },
          },
          // Bottom section with brand
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 60px 48px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '16px',
                      color: '#71717a',
                    },
                    children: 'datalog-blog.ru',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      // Chart logo
                      {
                        type: 'svg',
                        props: {
                          width: 28,
                          height: 28,
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          children: [
                            {
                              type: 'rect',
                              props: {
                                x: '3',
                                y: '12',
                                width: '4',
                                height: '9',
                                rx: '1',
                                fill: '#06b6d4',
                              },
                            },
                            {
                              type: 'rect',
                              props: {
                                x: '10',
                                y: '7',
                                width: '4',
                                height: '14',
                                rx: '1',
                                fill: '#06b6d4',
                                opacity: '0.7',
                              },
                            },
                            {
                              type: 'rect',
                              props: {
                                x: '17',
                                y: '3',
                                width: '4',
                                height: '18',
                                rx: '1',
                                fill: '#06b6d4',
                                opacity: '0.5',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#fafafa',
                          },
                          children: 'Даталог',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
