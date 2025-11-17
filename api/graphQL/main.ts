import baseURL from '../baseURL';

import { GraphQLClient, gql } from 'graphql-request';

export const graphcms = new GraphQLClient(baseURL!);

export const ARTICLES_CARD_QUERY = gql`
  {
    posts(
      orderBy: createdAt_DESC
      first: 100
      where: { category_in: [Technology, Career] }
    ) {
      id
      title
      category
      publishedDate
      description
      isTopPick
      slug
      coverPhoto {
        url(
          transformation: {
            image: { resize: { width: 1200, height: 1200 } }
            document: { output: { format: webp } }
          }
        )
      }
    }
  }
`;

export const ARTICLE_QUERY = gql`
  query Post($slug: String!) {
    posts(where: { slug: $slug }) {
      title
      category
      publishedDate
      description
      content {
        html
      }
      coverPhoto {
        url(
          transformation: {
            image: { resize: { width: 1200, height: 1200 } }
            document: { output: { format: webp } }
          }
        )
      }
    }
  }
`;
