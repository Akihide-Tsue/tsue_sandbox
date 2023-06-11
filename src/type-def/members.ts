export type PostItem = {
  authorId: string;
  authorName: string;
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMilliSeconds: number;
};

// export type MemberType = {
//   id: string;
//   name: string;
//   avatarSrc: string;
//   // role?: string;
//   bio?: string;
//   sources?: string[];
//   includeUrlRegex?: string;
//   excludeUrlRegex?: string;
//   githubUsername?: string;
//   twitterUsername?: string;
//   websiteUrl?: string;
// };

// export const members: MemberType[] = [
//   {
//     id: 'catnose',
//     name: 'CatNose',
//     // role: 'CTO',
//     bio: 'デザインが好きなプログラマー。開発者向けの情報共有プラットフォームzenn.devを開発しています。',
//     avatarSrc: '/avatars/catnose.jpg',
//     sources: ['https://zenn.dev/catnose99/feed', 'https://catnose.medium.com/feed'],
//     includeUrlRegex: 'medium.com|zenn.dev',
//     twitterUsername: 'catnose99',
//     githubUsername: 'catnose99',
//     websiteUrl: 'https://catnose99.com',
//   },
// ];
