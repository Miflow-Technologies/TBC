import React from 'react';
import { View, Text, useColorScheme, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';
import { NavigationContainer, ThemeProvider, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import listen from '@/app/listen';
import article from '@/app/article';
import index from '@/app';
import about from '@/app/about';
import live from '@/app/live';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const [notoFontsLoaded] = useNotoFonts({
    NotoSerif_400Regular,
    NotoSerif_700Bold
  });

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  if (!notoFontsLoaded) return null; // avoid rendering until fonts are loaded

  const tabBarOptions = {
    
  };

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
            labelStyle: {
              fontSize: 12,
              fontWeight: 'bold', // Adjust the text boldness
            },
            activeTintColor: theme.colors.primary, // Set the active tab color
            inactiveTintColor: isDarkMode ? '#fff' : '#000', // Set the inactive tab color
            style: {
              backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0', // Set the background color of the tab bar
            },
        }}>
          <Tab.Screen
            name="Listen"
            component={listen}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="headset-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Article"
            component={article}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="headset-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="TBC"
            component={index}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="leaf-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={about}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="headset-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Live"
            component={live}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="headset-outline" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Navbar;
