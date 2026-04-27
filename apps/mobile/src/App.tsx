import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { store } from './redux/store';
import { loginSuccess } from './redux/slices/authSlice';
import { darkTheme } from './theme';
import { authService } from './services/auth.service';
import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      // Restore tokens from AsyncStorage and set them in the API client
      const tokens = await authService.getStoredTokens();
      
      if (tokens) {
        const restored = await authService.restoreTokens();
        if (restored) {
          // Update Redux state with restored tokens
          store.dispatch(
            loginSuccess({
              user: { id: '', email: '', name: '' },
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            }),
          );
        }
      }
    } catch (error) {
      console.warn('Failed to restore session:', error);
      // User will see login screen if session cannot be restored
    } finally {
      setIsReady(true);
    }
  };

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: darkTheme.colors.surface,
        }}
      >
        <ActivityIndicator size="large" color={darkTheme.colors.primary} />
      </View>
    );
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={darkTheme as any}>
        <RootNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
}
