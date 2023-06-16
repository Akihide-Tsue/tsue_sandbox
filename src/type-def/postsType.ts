export type FrontMatterType = {
  title: string;
  date: string;
  description: string;
  image: string;
  categories: string;
  isDraft: boolean;
  tags: string[];
};

export type PostType = {
  slug: string;
  frontMatter: FrontMatterType;
};
