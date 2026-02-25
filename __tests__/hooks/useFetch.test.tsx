import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import useFetch from '@/hooks/useFetch';

jest.mock('@/api/baseURL', () => ({
  __esModule: true,
  default: 'https://api.example.com',
}));

const mockRequest = jest.fn();
jest.mock('graphql-request', () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: mockRequest,
  })),
}));

function TestComponent({ query, params }: { query: string; params?: object }) {
  const { data, loading, error } = useFetch<{ id: string }>(query, params);
  if (loading) return <span data-testid="loading">loading</span>;
  if (error) return <span data-testid="error">{error}</span>;
  return <span data-testid="data">{data ? JSON.stringify(data) : 'null'}</span>;
}

describe('useFetch', () => {
  beforeEach(() => {
    mockRequest.mockReset();
  });

  it('starts in loading state then shows data on success', async () => {
    mockRequest.mockResolvedValue({ id: '123' });
    render(<TestComponent query="query { id }" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('data')).toBeInTheDocument();
    });
    expect(screen.getByTestId('data').textContent).toBe('{"id":"123"}');
    expect(mockRequest).toHaveBeenCalledWith('query { id }', undefined);
  });

  it('passes params to the request', async () => {
    mockRequest.mockResolvedValue({ slug: 'hello' });
    render(
      <TestComponent
        query="query GetPost($slug: String)"
        params={{ slug: 'hello' }}
      />,
    );
    await waitFor(() => {
      expect(screen.getByTestId('data')).toBeInTheDocument();
    });
    expect(mockRequest).toHaveBeenCalledWith('query GetPost($slug: String)', {
      slug: 'hello',
    });
  });

  it('sets error state when request fails', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockRequest.mockRejectedValue(new Error('Network error'));
    render(<TestComponent query="query { id }" />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
    expect(screen.getByTestId('error').textContent).toBe(
      'Failed to fetch data',
    );
    spy.mockRestore();
  });
});
