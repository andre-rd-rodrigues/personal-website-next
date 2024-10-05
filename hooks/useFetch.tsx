import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';
import baseURL from '@/api/baseURL';

// TypeScript generic type for useFetch
type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Custom hook for fetching data from GraphQL
function useFetch<T>(
  query: string,
  params?: object | undefined,
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const graphcms = new GraphQLClient(baseURL || '');

    async function fetchData() {
      try {
        const data = await graphcms.request<T>(query, params);
        setState({ data, loading: false, error: null });
      } catch (error: unknown) {
        console.error(error);
        setState({ data: null, loading: false, error: 'Failed to fetch data' });
      }
    }

    fetchData();
  }, [query]);

  return state;
}

export default useFetch;
