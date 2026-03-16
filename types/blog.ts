export type Post = {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  description: string;
  isTopPick: boolean;
  slug: string;
  content: {
    html: string;
  };
  coverPhoto: {
    url: string;
  };
};
