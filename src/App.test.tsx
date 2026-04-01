import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { fetchLaunches2020 } from './api/spacex';

vi.mock('./api/spacex');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    vi.mocked(fetchLaunches2020).mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
      });

  it('displays launches after successful fetch', async () => {
    const mockLaunches = [
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
          mission_patch: 'https://example.com/patch.png',
          mission_patch_small: 'https://example.com/patch-small.png',
        },
        details: 'Test details',
      },
    ];

    vi.mocked(fetchLaunches2020).mockResolvedValue(mockLaunches);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Starlink 2')).toBeInTheDocument();
    });
  });

  it('displays error message on failed fetch', async () => {
    vi.mocked(fetchLaunches2020).mockRejectedValue(new Error('Network error'));
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error:/i)).toBeInTheDocument();
    });
  });
});