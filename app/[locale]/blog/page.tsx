'use client';
import { ARTICLES_CARD_QUERY } from '@/api/graphQL/main';
import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
import useFetch from '@/hooks/useFetch';
import { NextPage } from 'next';

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

type PostsData = {
  posts: Post[];
};

const Blog: NextPage<Post> = () => {
  const { data, loading, error } = useFetch<PostsData>(ARTICLES_CARD_QUERY);

  return (
    <Container className="max-w-full px-0">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {data?.posts && (
        <div className="flex flex-wrap justify-center gap-5">
          {data?.posts.map((post, i) => (
            <div className="max-w-full lg:max-w-[700px]" key={i}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Blog;
