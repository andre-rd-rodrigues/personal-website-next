import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Mobile from '@/app/[locale]/portfolio/mobile/page';

jest.mock('@/components/ProjectDisplay/ProjectDisplay', () =>
  require('@/__tests__/__mocks__/components/ProjectDisplay.mock').mockProjectDisplayModule(),
);

describe('Portfolio Mobile page', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<Mobile />)).not.toThrow();
  });

  it('renders hero section with Sundar Pichai quote', () => {
    renderWithIntl(<Mobile />);
    expect(
      screen.getByText(/- Sundar Pichai, CEO of Google/i),
    ).toBeInTheDocument();
  });

  it('renders Overview section', () => {
    renderWithIntl(<Mobile />);
    expect(
      screen.getByRole('heading', { name: /^overview$/i }),
    ).toBeInTheDocument();
  });

  it('renders mobile project displays', () => {
    renderWithIntl(<Mobile />);
    const projects = screen.getAllByTestId('project-display');
    expect(projects.length).toBeGreaterThan(0);
  });

  it('has link to portfolio web page', () => {
    renderWithIntl(<Mobile />);
    const nextLink = screen.getByRole('link', { name: /web/i });
    expect(nextLink).toBeInTheDocument();
    expect(nextLink.getAttribute('href')).toMatch(/portfolio\/web/);
  });
});
