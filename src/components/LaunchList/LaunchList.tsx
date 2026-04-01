import { Text } from '@mantine/core';
import type { SpaceXLaunch } from '../../types';
import { LaunchCard } from '../LaunchCard/LaunchCard';
import classes from './LaunchList.module.css'; 

interface LaunchListProps {
  launches: SpaceXLaunch[];
  onSeeMore: (launch: SpaceXLaunch) => void;
}

export const LaunchList: React.FC<LaunchListProps> = ({ launches, onSeeMore }) => {
  if (launches.length === 0) {
    return <Text ta="center">No launches found</Text>;
  }

  return (
    <div className={classes.gridContainer}>
      {launches.map((launch) => (
        <LaunchCard
          key={launch.flight_number}
          launch={launch}
          onSeeMore={onSeeMore}
        />
      ))}
    </div>
  );
};