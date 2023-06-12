import fs from 'fs-extra';
import Parser from 'rss-parser';

import { ZennPostItem } from '@type-def/members';

import { members } from '@components/zenn_posts/helper';

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMilliSeconds: number;
};

// type ZennPostItem = {
//   authorId: string;
//   authorName: string;
//   title: string;
//   link: string;
//   contentSnippet?: string;
//   isoDate?: string;
//   dateMilliSeconds: number;
// };

export type MemberType = {
  id: string;
  name: string;
  avatarSrc: string;
  // role?: string;
  bio?: string;
  sources?: string[];
  includeUrlRegex?: string;
  excludeUrlRegex?: string;
  githubUsername?: string;
  twitterUsername?: string;
  websiteUrl?: string;
};

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

function isValidUrl(str: string): boolean {
  try {
    const { protocol } = new URL(str);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

const parser = new Parser();
let allPostItems: ZennPostItem[] = [];

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];

  // return item which has title and link
  return feed.items
    .map(({ title, contentSnippet, link, isoDate }) => {
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ''),
        link,
        isoDate,
        dateMilliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      };
    })
    .filter(({ title, link }) => title && link && isValidUrl(link)) as FeedItem[];
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return [];
  let feedItems: FeedItem[] = [];
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}

async function getMemberFeedItems(member: MemberType): Promise<ZennPostItem[]> {
  const { id, sources, name, includeUrlRegex, excludeUrlRegex } = member;
  const feedItems = await getFeedItemsFromSources(sources);
  if (!feedItems) return [];

  let postItems = feedItems.map((item) => {
    return {
      ...item,
      authorName: name,
      authorId: id,
    };
  });
  // remove items which not matches includeUrlRegex
  if (includeUrlRegex) {
    postItems = postItems.filter((item) => {
      return item.link.match(new RegExp(includeUrlRegex));
    });
  }
  // remove items which matches excludeUrlRegex
  if (excludeUrlRegex) {
    postItems = postItems.filter((item) => {
      return !item.link.match(new RegExp(excludeUrlRegex));
    });
  }

  return postItems;
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function () {
  for (const member of members) {
    const items = await getMemberFeedItems(member);
    if (items) allPostItems = [...allPostItems, ...items];
  }
  allPostItems.sort((a, b) => b.dateMilliSeconds - a.dateMilliSeconds);
  fs.writeJsonSync('src/rss/zenn-posts.json', allPostItems);
})();
