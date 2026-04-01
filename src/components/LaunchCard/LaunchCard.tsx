import { Card, Image, Text, Button, Group } from '@mantine/core';
import type { SpaceXLaunch } from '../../types';
import classes from './LaunchCard.module.css'; // 👈 Импорт CSS Module

interface LaunchCardProps {
  launch: SpaceXLaunch;
  onSeeMore: (launch: SpaceXLaunch) => void;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({ launch, onSeeMore }) => {
  return (
    <Card className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image
          src={launch.links.mission_patch_small}
          alt={`${launch.mission_name} patch`}
          className={classes.image}
        />
      </Card.Section>

      <Group className={classes.titleGroup}>
        <Text className={classes.title}>
          {launch.mission_name}
        </Text>
      </Group>

      <Text className={classes.rocketName}>
        {launch.rocket.rocket_name}
      </Text>

      <Button 
        className={classes.seeMoreButton}
        data-testid="see-more-button"
        fullWidth 
        onClick={() => onSeeMore(launch)}
      >
        See more
      </Button>
    </Card>
  );
};