import { ZennPostItem } from '@type-def/members';

// import { members } from '@components/zenn_posts/zennBuilder';

import { MemberType } from '@components/zenn_posts/zennBuilder';
import posts from '@rss/zenn-posts.json';

export const members: MemberType[] = [
  {
    id: 'catnose',
    name: 'CatNose',
    // role: 'CTO',
    bio: 'デザインが好きなプログラマー。開発者向けの情報共有プラットフォームzenn.devを開発しています。',
    avatarSrc: '/avatars/catnose.jpg',
    sources: ['https://zenn.dev/catnose99/feed', 'https://catnose.medium.com/feed'],
    includeUrlRegex: 'medium.com|zenn.dev',
    twitterUsername: 'catnose99',
    githubUsername: 'catnose99',
    websiteUrl: 'https://catnose99.com',
  },
];

export function getMemberByName(name: string) {
  return members.find((member) => member.name === name);
}

export function getMemberById(id: string) {
  return members.find((member) => member.id === id);
}

export function getMemberPostsById(id: string) {
  return (posts as ZennPostItem[]).filter((item) => item.authorId === id);
}

export function getFaviconSrcFromOrigin(hostname: string) {
  return `https://www.google.com/s2/favicons?sz=32&domain_url=${hostname}`;
}
export function getMemberPath(id: string) {
  return `/members/${encodeURIComponent(id)}`;
}
