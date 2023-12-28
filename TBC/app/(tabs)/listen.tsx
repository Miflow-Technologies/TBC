import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Sermon from '../(listen)/Sermon';
import Goaks from '../(listen)/Goaks';
import { Platform, View, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';



const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ListenScreen = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="ListenContent"
      component={TopTabs}
      options={{ headerShown: false }} // Hide header for nested navigator
    />
  </Stack.Navigator>
);
};


const TopTabs = () => {
  const [poppinsFontsLoaded] = usePoppinsFonts({
    Poppins_700Bold
  });

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  if (!poppinsFontsLoaded) {
    return null
  }
  return (
    <TopTab.Navigator screenOptions={{tabBarStyle: styles.containerStyle,
      tabBarIndicatorStyle: [styles.indicator, {backgroundColor: isDarkMode ? '#000' : '#fff'}],
      tabBarLabelStyle: styles.label,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textGrey,}}>
      <TopTab.Screen name="Sermon" component={Sermon} />
      <TopTab.Screen name="Goaks" component={Goaks} />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14

  },
  indicator: {
    position: 'absolute',
    zIndex: -1,
    width: Platform.OS === 'ios' ? 100 : 100,
    height: Platform.OS === 'ios' ? 44 : 45,
    alignItems: 'center',
    borderRadius: 8,
    shadowOffset:{width: 3, height: 2},
    shadowOpacity: 0.6
  },
  containerStyle: {
    top: Platform.OS === 'ios' ? 50 : 50,
    height: Platform.OS === 'ios' ? 45 : 45, 
    width: Platform.OS === 'ios' ? 200 : 200,
    backgroundColor: '#D1E1E0',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 8,
    left: Platform.OS === 'ios' ? 10 : 15,
  },
});

export default ListenScreen;
