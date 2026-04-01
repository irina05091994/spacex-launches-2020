import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { LaunchList } from './LaunchList';
import { expect, it, describe, vi } from 'vitest';
import { type SpaceXLaunch } from '../../types';

const mockLaunches: SpaceXLaunch[] = [
  {
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
      mission_patch: 'https://example.com/patch1.png',
      mission_patch_small: 'https://example.com/patch1-small.png',
    },
    details: 'Details 1',
  },
  {
    flight_number: 2,
    mission_name: 'Starlink 3',
    launch_year: '2020',
    launch_date_unix: 1582416000,
    rocket: {
      rocket_id: 'falcon9',
      rocket_name: 'Falcon 9',
      rocket_type: 'FT',
    },
    links: {
      mission_patch: 'https://example.com/patch2.png',
      mission_patch_small: 'https://example.com/patch2-small.png',
    },
    details: 'Details 2',
  },
];

const renderWithMantine = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};

describe('LaunchList', () => {
  it('renders all launches', () => {
    renderWithMantine(
      <LaunchList launches={mockLaunches} onSeeMore={() => {}} />
    );

    expect(screen.getByText('Starlink 2')).toBeInTheDocument();
    expect(screen.getByText('Starlink 3')).toBeInTheDocument();
  });

  it('shows "No launches found" when launches array is empty', () => {
    renderWithMantine(
      <LaunchList launches={[]} onSeeMore={() => {}} />
    );

    expect(screen.getByText('No launches found')).toBeInTheDocument();
  });

  it('calls onSeeMore with correct launch when card button is clicked', () => {
    const onSeeMore = vi.fn();
    renderWithMantine(
      <LaunchList launches={mockLaunches} onSeeMore={onSeeMore} />
    );

    const buttons = screen.getAllByRole('button', { name: /see more/i });
    buttons[0].click();

    expect(onSeeMore).toHaveBeenCalledWith(mockLaunches[0]);
  });
});