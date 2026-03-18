import type { CollectionEntry } from 'astro:content';

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatReadingTime(minutesRead: string): string {
  const match = minutesRead.match(/(\d+)/);
  if (!match) return minutesRead;
  const minutes = parseInt(match[1], 10);
  const lastTwo = minutes % 100;
  const lastOne = minutes % 10;

  let word = 'минут';
  if (lastTwo >= 11 && lastTwo <= 19) {
    word = 'минут';
  } else if (lastOne === 1) {
    word = 'минута';
  } else if (lastOne >= 2 && lastOne <= 4) {
    word = 'минуты';
  }

  return `${minutes} ${word} чтения`;
}

export function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  limit = 3
): CollectionEntry<'blog'>[] {
  const scored = allPosts
    .filter((post) => post.id !== currentPost.id && !post.data.draft)
    .map((post) => {
      let score = 0;
      if (post.data.category === currentPost.data.category) score += 3;
      const sharedTags = post.data.tags.filter((tag) =>
        currentPost.data.tags.includes(tag)
      );
      score += sharedTags.length;
      const daysDiff =
        Math.abs(
          post.data.pubDate.getTime() - currentPost.data.pubDate.getTime()
        ) /
        (1000 * 60 * 60 * 24);
      score += Math.max(0, 1 - daysDiff / 365);
      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}
