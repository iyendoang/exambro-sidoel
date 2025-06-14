import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import FormScreen from '../screen/form-screen/form-screen';
import LembagaScreen from '../screen/lembaga-screen/';
import WebViewScreen from '../screen/webview-screen';
import { RootStackParamList } from '../types/navigation';
import ToggleThemeButton from './toggle-theme-button';

interface AppNavigatorProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  combinedTheme: any; // sesuaikan dengan tipe theme mu
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({
  isDarkMode,
  setIsDarkMode,
  combinedTheme,
}: AppNavigatorProps) {
  const headerRight = useCallback(
    () => (
      <ToggleThemeButton
        isDark={isDarkMode}
        onToggle={() => setIsDarkMode(!isDarkMode)}
      />
    ),
    [isDarkMode, setIsDarkMode],
  );

  return (
    <NavigationContainer theme={combinedTheme}>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: 'Formulir', headerShown: false }}
        />
        <Stack.Screen
          name="Lembaga"
          component={LembagaScreen}
          options={{ title: 'Dashboard', headerRight }}
        />
        <Stack.Screen
          name="Exam"
          component={WebViewScreen}
          options={{ title: 'Web VIew', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
