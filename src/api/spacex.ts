import { type SpaceXLaunch } from '../types';

const API_BASE_URL = 'https://api.spacexdata.com/v3';

export const fetchLaunches2020 = async (): Promise<SpaceXLaunch[]> => {
  const response = await fetch(`${API_BASE_URL}/launches?launch_year=2020`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};