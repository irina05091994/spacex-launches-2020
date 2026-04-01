import { type LaunchState, type LaunchAction } from '../types';

export const initialState: LaunchState = {
  launches: [],
  loading: false,
  error: null,
  selectedLaunch: null,
  isModalOpen: false,
};

export const launchReducer = (state: LaunchState, action: LaunchAction): LaunchState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        launches: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        selectedLaunch: action.payload,
        isModalOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedLaunch: null,
        isModalOpen: false,
      };
    default:
      return state;
  }
};