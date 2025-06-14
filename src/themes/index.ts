import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    Theme as NavigationTheme,
} from '@react-navigation/native';
import {
    MD3DarkTheme as PaperDarkTheme,
    MD3LightTheme as PaperLightTheme,
} from 'react-native-paper';

export const combineThemes = (
  navTheme: NavigationTheme,
  paperTheme: typeof PaperLightTheme,
) => ({
  ...navTheme,
  dark: paperTheme.dark,
  colors: {
    ...navTheme.colors,
    ...paperTheme.colors,
  },
});

export function createPaperTheme(isDarkMode: boolean) {
  const baseTheme = isDarkMode ? PaperDarkTheme : PaperLightTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: isDarkMode ? '#0f172a' : '#f8fafc',
      surface: isDarkMode ? '#1e293b' : '#ffffff',
      onSurface: isDarkMode ? '#f8fafc' : '#0f172a',
      primary: isDarkMode ? '#94a3b8' : '#334155',
      secondary: isDarkMode ? '#64748b' : '#475569',
      outline: isDarkMode ? '#475569' : '#cbd5e1',
      elevation: {
        level0: 'transparent',
        level1: isDarkMode ? '#1e293b' : '#f1f5f9',
        level2: isDarkMode ? '#334155' : '#e2e8f0',
        level3: isDarkMode ? '#475569' : '#cbd5e1',
        level4: isDarkMode ? '#64748b' : '#94a3b8',
        level5: isDarkMode ? '#94a3b8' : '#64748b',
      },
    },
  };
}

export { NavigationDarkTheme, NavigationDefaultTheme };
