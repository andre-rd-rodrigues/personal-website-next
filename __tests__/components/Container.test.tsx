import Container from '@/components/Container';
import '@testing-library/jest-dom';
import { render, screen } from '../utils/test.utils';

describe('Container', () => {
  it('renders children', () => {
    render(
      <Container>
        <span>Hello</span>
      </Container>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <span>Content</span>
      </Container>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
    expect(wrapper).toHaveClass('max-w-7xl');
  });
});
