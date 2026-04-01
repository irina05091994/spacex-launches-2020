import { render, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { LaunchModal } from './LaunchModal';
import { expect, it, describe, vi } from 'vitest';
import type { SpaceXLaunch } from '../../types';

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
  details: 'Test mission details',
};

const renderWithMantine = (component: React.ReactElement) => {
  return render(
    <MantineProvider>
      {component}
    </MantineProvider>
  );
};


const findByTestId = (id: string) => 
  document.body.querySelector(`[data-testid="${id}"]`);

describe('LaunchModal', () => {
  it('does not render when not open', () => {
    renderWithMantine(
      <LaunchModal launch={mockLaunch} isOpen={false} onClose={() => {}} />
    );
    
    expect(findByTestId('modal-overlay')).toBeNull();
    expect(findByTestId('modal-content')).toBeNull();
  });

  it('renders launch details when isOpen is true', async () => {
    renderWithMantine(
      <LaunchModal launch={mockLaunch} isOpen={true} onClose={() => {}} />
    );
    await waitFor(() => {
      expect(findByTestId('modal-content')).toBeTruthy();
    }, { timeout: 3000 });

    const modal = findByTestId('modal-content');
    expect(modal?.textContent).toContain('Starlink 2');
    expect(modal?.textContent).toContain('Falcon 9');
    expect(modal?.textContent).toContain('Test mission details');
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    
    renderWithMantine(
      <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
    );

    await waitFor(() => {
      expect(findByTestId('modal-close-button')).toBeTruthy();
    }, { timeout: 3000 });

    fireEvent.click(findByTestId('modal-close-button')!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside modal content', async () => {
    const onClose = vi.fn();
    
    renderWithMantine(
      <LaunchModal launch={mockLaunch} isOpen={true} onClose={onClose} />
    );

    await waitFor(() => {
      expect(findByTestId('modal-overlay')).toBeTruthy();
    }, { timeout: 3000 });

    fireEvent.click(findByTestId('modal-overlay')!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});