import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image, Text, ScrollArea } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import type { SpaceXLaunch } from '../../types';
import classes from './LaunchModal.module.css'; // 👈 Импорт CSS Module

interface LaunchModalProps {
  launch: SpaceXLaunch | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({ launch, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !launch) return null;

  const modalContent = (
    <div
      className={classes.overlay}
      data-testid="modal-overlay"
      onClick={onClose}
    >
      <div
        className={classes.content}
        data-testid="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={classes.closeButton}
          data-testid="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <IconX size={24} />
        </button>

        <div className={classes.patchContainer}>
          <Image
            src={launch.links.mission_patch}
            alt={`${launch.mission_name} patch`}
            className={classes.patchImage}
          />
        </div>
        <Text className={classes.headingLabel}>
          Mission Name:
        </Text>

        <Text className={classes.missionTitle}>
           {launch.mission_name}
        </Text>

        <Text className={classes.headingLabel}>
          Rocket Name:
        </Text>

        <Text className={classes.rocketName}>
           {launch.rocket.rocket_name}
        </Text>

        <Text className={classes.detailsLabel}>
          Details:
        </Text>

        <ScrollArea.Autosize className={classes.detailsScrollArea}>
          <Text className={classes.detailsText}>
            {launch.details || 'No details available'}
          </Text>
        </ScrollArea.Autosize>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};