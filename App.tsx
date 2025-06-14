import React, { useMemo, useState } from 'react';
import { Provider as PaperProvider, Portal } from 'react-native-paper';
import { SnackbarProvider } from './src/components/snackbar-provider';

import AppNavigator from './src/navigation/app-navigator';
import { combineThemes, createPaperTheme, NavigationDarkTheme, NavigationDefaultTheme } from './src/themes';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const paperTheme = useMemo(() => createPaperTheme(isDarkMode), [isDarkMode]);

  const navigationTheme = isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme;

  const combinedTheme = useMemo(() => combineThemes(navigationTheme, paperTheme), [navigationTheme, paperTheme]);

  return (
    <PaperProvider theme={paperTheme}>
      <Portal.Host>
        <SnackbarProvider>
          <AppNavigator isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} combinedTheme={combinedTheme} />
        </SnackbarProvider>
      </Portal.Host>
    </PaperProvider>
  );
}
