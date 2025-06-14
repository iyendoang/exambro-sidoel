import React from 'react';
import { IconButton } from 'react-native-paper';

interface ToggleThemeButtonProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ToggleThemeButton({
  isDark,
  onToggle,
}: ToggleThemeButtonProps) {
  return (
    <IconButton
      icon={isDark ? 'weather-sunny' : 'weather-night'}
      onPress={onToggle}
      accessibilityLabel="Toggle theme"
    />
  );
}
