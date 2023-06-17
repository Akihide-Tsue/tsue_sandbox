import fs from 'fs-extra';
import Parser from 'rss-parser';

import { members } from '@components/features/zennRss/constants';

import type { FeedItem, MemberType, ZennPostItem } from '@components/features/zennRss/types';

export const handler = () => {
  //参考：https://zenn.dev/catnose99/articles/cb72a73368a547756862

  const isValidUrl = (str: string): boolean => {
    try {
      const { protocol } = new URL(str);

      return protocol === 'http:' || protocol === 'https:';
    } catch {
      return false;
    }
  };

  const parser = new Parser();
  let allPostItems: ZennPostItem[] = [];

  const fetchFeedItems = async (url: string) => {
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
  };

  const getFeedItemsFromSources = async (sources: undefined | string[]) => {
    if (!sources?.length) return [];
    let feedItems: FeedItem[] = [];

    for (const url of sources) {
      const items = await fetchFeedItems(url);

      if (items) feedItems = [...feedItems, ...items];
    }

    return feedItems;
  };

  const getMemberFeedItems = async (member: MemberType): Promise<ZennPostItem[]> => {
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
  };

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async function () {
    for (const member of members) {
      const items = await getMemberFeedItems(member);

      if (items) allPostItems = [...allPostItems, ...items];
    }
    allPostItems.sort((a, b) => b.dateMilliSeconds - a.dateMilliSeconds);
    fs.writeJsonSync('src/rss/zenn-posts.json', allPostItems);
  })();
};
