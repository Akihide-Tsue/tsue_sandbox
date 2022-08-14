export type FrontMatterType = {
  title: string;
  date: string;
  description: string;
  image: string;
  categories: string;
  tag: string[];
};

export type PostType = {
  slug: string;
  frontMatter: FrontMatterType;
};
