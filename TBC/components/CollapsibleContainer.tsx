import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import { Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { useFonts } from 'expo-font';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const CollapsibleContainer = ({
  title,
  subtitle,
  author,
  buttonText,
  initialExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const containerRef = useRef(null);
  const animatedHeight = useSharedValue(0);
  const [fontsLoaded] = useFonts({
    // Load the specified fonts
    Poppins_500Medium,
    Poppins_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';


  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(250) : withTiming(75
      );

    return {
      height: animatedHeight.value,
    };
  }, [expanded]);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleOutsidePress = (event: { nativeEvent: { target: any; }; }) => {
    if (!containerRef.current.contains(event.nativeEvent.target)) {
      setExpanded(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={styles.wrap}
      ref={containerRef}
      onPressOut={handleOutsidePress}
    >
      <Animated.View
        style={[collapsabletyle, {overflow: 'hidden'}]}
      >
        {fontsLoaded ? (
          <Text style={[styles.title, {
            color: expanded ? '#fff' : isDarkMode ? '#fff' : '#000',
          },]}>{title}</Text>
        ) : (
          <Text>Loading fonts...</Text>
        )}
        {expanded && (
          <View>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.author}>{author}</Text>
            <View style={styles.buttonCard}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({  
  wrap: {
    width: Platform.OS === 'ios' ? '98%' : '98%',
    borderRadius: 25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  buttonCard: {
    height: 65,
    width: 300,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 25,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  buttonText  : {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 17,
    color: Colors.textGrey
  },
  container: { position: 'absolute', left: 0 },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold'
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'NotoSerif_400Regular',
    color: '#E8E8E8'
  },
  author: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold'
  }
});


export default CollapsibleContainer;

