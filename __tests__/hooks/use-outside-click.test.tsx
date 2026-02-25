import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useOutsideClick } from '@/hooks/use-outside-click';

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        inside
      </div>
      <div data-testid="outside">outside</div>
    </div>
  );
}

describe('useOutsideClick', () => {
  it('calls callback when mousedown happens outside the ref element', () => {
    const onOutsideClick = jest.fn();
    render(<TestComponent onOutsideClick={onOutsideClick} />);
    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('calls callback when touchstart happens outside the ref element', () => {
    const onOutsideClick = jest.fn();
    render(<TestComponent onOutsideClick={onOutsideClick} />);
    const outside = screen.getByTestId('outside');
    fireEvent.touchStart(outside);
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('does not call callback when mousedown happens inside the ref element', () => {
    const onOutsideClick = jest.fn();
    render(<TestComponent onOutsideClick={onOutsideClick} />);
    const inside = screen.getByTestId('inside');
    fireEvent.mouseDown(inside);
    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('does not call callback when touchstart happens inside the ref element', () => {
    const onOutsideClick = jest.fn();
    render(<TestComponent onOutsideClick={onOutsideClick} />);
    const inside = screen.getByTestId('inside');
    fireEvent.touchStart(inside);
    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('does not call callback when mousedown happens on a child of the ref element', () => {
    const onOutsideClick = jest.fn();
    render(<TestComponent onOutsideClick={onOutsideClick} />);
    const inside = screen.getByTestId('inside');
    const child = inside.firstChild as HTMLElement;
    fireEvent.mouseDown(child);
    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});
