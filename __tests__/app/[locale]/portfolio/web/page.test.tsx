import { renderWithIntl, screen } from '@/__tests__/utils/test.utils';
import Web from '@/app/[locale]/portfolio/web/page';

jest.mock('@/components/ProjectDisplay/ProjectDisplay', () =>
  require('@/__tests__/__mocks__/components/ProjectDisplay.mock').mockProjectDisplayModule(),
);

describe('Portfolio Web page', () => {
  it('renders without throwing', () => {
    expect(() => renderWithIntl(<Web />)).not.toThrow();
  });

  it('renders hero section with Bill Gates quote', () => {
    const { container } = renderWithIntl(<Web />);
    expect(container.textContent).toMatch(
      /theinternetisbecomingthetownsquarefortheglobalvillageoftomorrow/i,
    );
    expect(
      screen.getByText(/- Bill Gates, Co-founder of Microsoft/i),
    ).toBeInTheDocument();
  });

  it('renders Overview section', () => {
    renderWithIntl(<Web />);
    expect(
      screen.getByRole('heading', { name: /^overview$/i }),
    ).toBeInTheDocument();
  });

  it('distinguishes client projects from company experience', () => {
    renderWithIntl(<Web />);
    expect(
      screen.getByRole('heading', { name: /client projects/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /company experience/i }),
    ).toBeInTheDocument();
  });

  it('renders web project displays', () => {
    renderWithIntl(<Web />);
    const projects = screen.getAllByTestId('project-display');
    expect(projects.length).toBeGreaterThan(0);
  });

  it('has link to portfolio mobile page', () => {
    renderWithIntl(<Web />);
    const nextLink = screen.getByRole('link', { name: /apps/i });
    expect(nextLink).toBeInTheDocument();
    expect(nextLink.getAttribute('href')).toMatch(/portfolio\/mobile/);
  });
});
