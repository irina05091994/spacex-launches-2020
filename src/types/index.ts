export interface SpaceXRocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface SpaceXLinks {
  mission_patch: string;
  mission_patch_small: string;
  reddit_campaign?: string;
  reddit_launch?: string;
  reddit_recovery?: string;
  reddit_media?: string;
  presskit?: string;
  article_link?: string;
  wikipedia?: string;
  video_link?: string;
  youtube_id?: string;
  flickr_images?: string[];
}

export interface SpaceXLaunch {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_unix: number;
  rocket: SpaceXRocket;
  links: SpaceXLinks;
  details: string;
}

export interface LaunchState {
  launches: SpaceXLaunch[];
  loading: boolean;
  error: string | null;
  selectedLaunch: SpaceXLaunch | null;
  isModalOpen: boolean;
}

export type LaunchAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: SpaceXLaunch[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'OPEN_MODAL'; payload: SpaceXLaunch }
  | { type: 'CLOSE_MODAL' };