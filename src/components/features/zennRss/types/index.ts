export type ZennPostItem = {
  authorId: string;
  authorName: string;
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMilliSeconds: number;
};

export type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMilliSeconds: number;
};

export type MemberType = {
  id: string;
  name: string;
  sources?: string[];
  includeUrlRegex?: string;
  excludeUrlRegex?: string;
};
