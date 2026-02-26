import React from 'react';
import { act, render, screen } from '@testing-library/react';
import useIsMobile from '@/hooks/useIsMobile';

function TestComponent({ breakpoint }: { breakpoint?: number }) {
  const isMobile = useIsMobile(breakpoint);
  return <span data-testid="is-mobile">{isMobile ? 'yes' : 'no'}</span>;
}

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      writable: true,
    });
  });

  it('returns true when window width is less than or equal to breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });
    render(<TestComponent breakpoint={450} />);
    expect(screen.getByTestId('is-mobile').textContent).toBe('yes');
  });

  it('returns false when window width is greater than breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
    render(<TestComponent breakpoint={450} />);
    expect(screen.getByTestId('is-mobile').textContent).toBe('no');
  });

  it('uses default breakpoint of 450', () => {
    Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });
    render(<TestComponent />);
    expect(screen.getByTestId('is-mobile').textContent).toBe('yes');
  });

  it('updates when window is resized', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });
    render(<TestComponent breakpoint={450} />);
    expect(screen.getByTestId('is-mobile').textContent).toBe('yes');

    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
    await act(async () => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByTestId('is-mobile').textContent).toBe('no');
  });
});
