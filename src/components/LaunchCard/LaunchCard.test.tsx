import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { LaunchCard } from './LaunchCard';
import { type SpaceXLaunch } from '../../types';
import { expect, it, describe, vi } from 'vitest';

const mockLaunch: SpaceXLaunch = {
  flight_number: 1,
  mission_name: 'Starlink 2',
  launch_year: '2020',
  launch_date_unix: 1581206400,
  rocket: {
    rocket_id: 'falcon9',
    rocket_name: 'Falcon 9',
    rocket_type: 'FT',
  },
  links: {
    mission_patch: 'https://example.com/patch.png',
    mission_patch_small: 'https://example.com/patch-small.png',
  },
  details: 'Test details',
};

const renderWithMantine = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('LaunchCard', () => {
    
  it('renders mission name and rocket name', () => {
    renderWithMantine(
      <LaunchCard launch={mockLaunch} onSeeMore={() => {}} />
    );

    expect(screen.getByText('Starlink 2')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
  });

  it('renders See more button', () => {
    renderWithMantine(
      <LaunchCard launch={mockLaunch} onSeeMore={() => {}} />
    );

    expect(screen.getByRole('button', { name: /see more/i })).toBeInTheDocument();
  });

  it('calls onSeeMore when button is clicked', () => {
    const onSeeMore = vi.fn();
    renderWithMantine(
      <LaunchCard launch={mockLaunch} onSeeMore={onSeeMore} />
    );

    screen.getByRole('button', { name: /see more/i }).click();
    expect(onSeeMore).toHaveBeenCalledWith(mockLaunch);
  });
});