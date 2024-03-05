import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import {  useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '@/app/context/Auth'
import { AudioProvider } from '@/app/context/audio';




export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();


  return (
    <AuthProvider>
      <AudioProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/dailyQuote" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/devotional" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/announcements" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/articleReader" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/audioSermonList" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/excerptList" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adminPanel" options={{ headerShown: false }} />
            <Stack.Screen 
            name="auth/login" 
            options={{  
            headerShown: false,
            }} />
            <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal' }}
            />
          </Stack>
        </ThemeProvider>
      </AudioProvider>
    </AuthProvider>
  );
}

