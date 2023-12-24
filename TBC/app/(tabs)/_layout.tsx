import React from 'react';
import { View, Text, Platform, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';  // Import Link and useRouting
import {
  NotoSerif_400Regular,
  NotoSerif_700Bold,
  useFonts as useNotoFonts,
} from '@expo-google-fonts/noto-serif';
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
 // Destructure navigate from useRouting

  const [notoFontsLoaded] = useNotoFonts({
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });

  const theme = useTheme();
  const colorScheme = theme.dark ? 'dark' : 'light';
  const isDarkMode = colorScheme === 'dark';

  if (!notoFontsLoaded) {
    return null; // avoid rendering until fonts are loaded
  }

  return (
    <Tabs  screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: Platform.OS === 'ios' ? 100 : 80,
        backgroundColor: theme.colors.background,
      },
    }}>

      <Tabs.Screen
          name="listen"
          options={{
            title: "listen",
            tabBarIcon: ({ focused} : { focused : boolean} ) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons
                    name={focused ? 'play' : 'play-outline'}
                    size={24}
                    color={focused ? Colors.primary : isDarkMode ? '#fff' : Colors.textGrey}
                  />
                  <Text
                    style={{
                      fontFamily: focused && !isDarkMode ? 'NotoSerif_700Bold' : focused && isDarkMode ? 'NotoSerif_400Regular' : 'NotoSerif_400Regular',
                      color: focused && !isDarkMode ? '#000' : isDarkMode && focused ? Colors.primary : Colors.textGrey,
                    }}
                  >
                    Listen
                  </Text>
              </View>
              )
            }
          }}
      />

        <Tabs.Screen
          name="article"
          options={{
            title: "article",
            tabBarIcon: ({ focused} : { focused : boolean} ) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons
                  name={focused ? 'notebook' : 'notebook-outline'}
                  size={24}
                  color={focused ? Colors.blue : isDarkMode ? '#fff' : Colors.textGrey}
                />
                <Text
                  style={{
                    fontFamily: focused && !isDarkMode ? 'NotoSerif_700Bold' : focused && isDarkMode ? 'NotoSerif_400Regular' : 'NotoSerif_400Regular',
                    color: focused && !isDarkMode ? '#000' : isDarkMode && focused ? Colors.blue : Colors.textGrey,
                  }}
                >
                  Article
                </Text>
              </View>
              )
            }
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ focused} : { focused : boolean} ) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.colors.background,
                      width: Platform.OS === 'ios' ? 70 : 80,
                      height: Platform.OS === 'ios' ? 70 : 80,
                      top: Platform.OS === 'ios' ? -20 : -30,
                      borderRadius: Platform.OS === 'ios' ? 50 : 50,
                      elevation: Platform.OS === 'android' ? 6 : 0,
                      shadowColor: focused ? Colors.secondary : isDarkMode ? '#fff' : Colors.textGrey,
                      shadowOpacity: 0.3,
                      shadowOffset: { width: 0, height: 5 },
                    }}
                  >
                    <Ionicons
                      name={focused ? 'leaf' : 'leaf-outline'}
                      size={30}
                      color={focused ? Colors.secondary : isDarkMode ? '#fff' : Colors.textGrey}
                      flip={'horizontal'}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: focused && !isDarkMode ? 'NotoSerif_700Bold' : focused && isDarkMode ? 'NotoSerif_400Regular' : 'NotoSerif_400Regular',
                      color: focused && !isDarkMode ? '#000' : isDarkMode && focused ? Colors.secondary : Colors.textGrey,
                      top: Platform.OS === 'android' ? -12 : 0,
                    }}
                  >
                    TBC
                  </Text>
                </View>
              )
            }
          }}
        />

        <Tabs.Screen
          name="about"
          options={{
            title: "about",
            tabBarIcon: ({ focused} : { focused : boolean} ) => { 
              return (  
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons
                    name={focused ? 'map' : 'map-outline'}
                    size={24}
                    color={focused ? Colors.yellow : isDarkMode ? '#fff' : Colors.textGrey}
                  />
                  <Text
                    style={{
                      fontFamily: focused && !isDarkMode ? 'NotoSerif_700Bold' : focused && isDarkMode ? 'NotoSerif_400Regular' : 'NotoSerif_400Regular',
                      color: focused && !isDarkMode ? '#000' : isDarkMode && focused ? Colors.yellow : Colors.textGrey,
                    }}
                  >
                    About
                  </Text>
                 </View>
              )
            }
          }}
        />

        <Tabs.Screen
          name="live"
          options={{
            title: "live",
            tabBarIcon: ({ focused} : { focused : boolean} ) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons
                      name={focused ? 'tv' : 'tv-outline'}
                      size={24}
                      color={focused ? Colors.red : isDarkMode ? '#fff' : Colors.textGrey}
                    />
                    <Text
                      style={{
                        fontFamily: focused && !isDarkMode ? 'NotoSerif_700Bold' : focused && isDarkMode ? 'NotoSerif_400Regular' : 'NotoSerif_400Regular',
                        color: focused && !isDarkMode ? '#000' : isDarkMode && focused ? Colors.red : Colors.textGrey,
                      }}
                    >
                      Live
                    </Text>
                </View>
              )
            }
          }}
        />
    </Tabs>
  );
};