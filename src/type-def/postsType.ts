export type FrontMatterType = {
  title: string;
  date: string;
  image: string;
  tag: string[];
};

export type PostType = {
  slug: string;
  frontMatter: FrontMatterType;
};
