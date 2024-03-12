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
            <Stack.Screen name="utils/settings" options={{ headerShown: false }} />
            <Stack.Screen name="utils/profile" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/dailyQuote" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/devotional" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/announcements" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/articleReader" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/audioSermonList" options={{ headerShown: false }} />
            <Stack.Screen name="(details)/excerptList" options={{ headerShown: false }} />
            <Stack.Screen name="(modals)/pnp" options={{ headerShown: false }} />
            <Stack.Screen name="(modals)/tsnCs" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adminPanel" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/upload" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/sermon" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/quote" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/inspirational" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/goaks" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/excerpt" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/devotional" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/audioSermon" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/article" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adUpload/announcement" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/manage" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/sermon" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/quote" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/inspirational" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/goaks" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/excerpt" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/devotional" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/audioSermon" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/articles" options={{ headerShown: false }} />
            <Stack.Screen name="admin/adManage/announcement" options={{ headerShown: false }} />
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

