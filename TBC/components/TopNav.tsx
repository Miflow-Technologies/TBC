import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform, StyleSheet } from 'react-native';
import Sermon from '@/app/(listen)/Sermon';
import Excerpts from '@/app/Excerpt';
import Inspirational from '@/app/Inspirational';
import Goaks from '@/app/(listen)/Goaks';
import {
    Poppins_500Medium,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';
import {
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  } from '@expo-google-fonts/noto-serif';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { useFonts } from 'expo-font';
import * as Haptics from 'expo-haptics';


const TopNavigator = createMaterialTopTabNavigator();
export default function TopNav() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <TopNavigator.Navigator

      screenOptions={{
        tabBarStyle: styles.containerStyle,
        tabBarIndicatorStyle: [styles.indicator, {backgroundColor: isDarkMode ? '#fff' : '#000'}],
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textGrey,
      }}
    >
      <TopNavigator.Screen
        options={{
          tabBarIndicatorStyle: [
            styles.indicator,
            {
              marginLeft: 10,
            },
          ],
        }}
        name="Sermon"
        component={Sermon}
      />
      <TopNavigator.Screen name="Excerpts" component={Excerpts} />
      <TopNavigator.Screen name="Inspirational" component={Inspirational} />
      <TopNavigator.Screen
        options={{
          tabBarIndicatorStyle: [
            styles.indicator,
            {
              width: 'auto',
            },
          ],
        }}
        name="Goaks"
        component={Goaks}
      />
    </TopNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14
  },
  indicator: {
    position: 'absolute',
    zIndex: -1,
    bottom: '15%',
    height: '70%',
  },
  containerStyle: {
    width: Platform.OS === 'ios' ? 'auto' : 300,
    backgroundColor: '#D1E1E0',
    alignSelf: 'center',
    borderRadius: 8,
  },
});