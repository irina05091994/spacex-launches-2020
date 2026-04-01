import { useEffect, useReducer } from 'react';
import { Container, Title, Loader, Text, Center, MantineProvider } from '@mantine/core';
import { fetchLaunches2020 } from './api/spacex';
import type { SpaceXLaunch } from './types';
import { LaunchList } from './components/LaunchList/LaunchList';
import { LaunchModal } from './components/LaunchModal/LaunchModal';
import { launchReducer, initialState } from './state/reducer';

function App() {
  const [state, dispatch] = useReducer(launchReducer, initialState);

  useEffect(() => {
    const loadLaunches = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const launches = await fetchLaunches2020();
        dispatch({ type: 'FETCH_SUCCESS', payload: launches });
      } catch (error) {
        dispatch({ 
          type: 'FETCH_ERROR', 
          payload: error instanceof Error ? error.message : 'Failed to fetch launches' 
        });
      }
    };

    loadLaunches();
  }, []);

  const handleSeeMore = (launch: SpaceXLaunch) => {
    dispatch({ type: 'OPEN_MODAL', payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <MantineProvider>
      <Container size="xl" py="xl">
        <Title order={1} ta="center" mb="xl">
          SpaceX Launches 2020
        </Title>

        {state.loading && (
        <Center py="xl">
        <Loader 
         size="lg" 
          data-testid="loader"  
         aria-label="loading"
         />
        </Center>
        )}

        {state.error && (
          <Text c="red" ta="center">
            Error: {state.error}
          </Text>
        )}

        {!state.loading && !state.error && (
          <LaunchList 
            launches={state.launches} 
            onSeeMore={handleSeeMore} 
          />
        )}

        <LaunchModal
          launch={state.selectedLaunch}
          isOpen={state.isModalOpen}
          onClose={handleCloseModal}
        />
      </Container>
    </MantineProvider>
  );
}

export default App;