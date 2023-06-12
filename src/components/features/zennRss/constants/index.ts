import { MemberType } from '@components/zenn_posts/zennBuilder';

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
