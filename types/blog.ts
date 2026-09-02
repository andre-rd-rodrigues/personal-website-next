export type PostSummary = {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  description: string;
  isTopPick: boolean;
  slug: string;
  coverPhoto: {
    url: string;
  };
};

export type Post = PostSummary & {
  content: {
    html: string;
  };
};
