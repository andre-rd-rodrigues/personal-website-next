import React from 'react';

/**
 * Reusable mock for @/components/ProjectDisplay/ProjectDisplay.
 * Renders a div with data-testid="project-display" and data-label from props.
 *
 * @example
 * jest.mock('@/components/ProjectDisplay/ProjectDisplay', () =>
 *   require('@/__tests__/__mocks__/components/ProjectDisplay.mock').mockProjectDisplayModule(),
 * );
 */
export const mockProjectDisplayModule = () => ({
  __esModule: true,
  default: (props: { label: string }) =>
    React.createElement('div', {
      'data-testid': 'project-display',
      'data-label': props.label,
    }),
});
