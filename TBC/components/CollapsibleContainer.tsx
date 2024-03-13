import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { Link } from 'expo-router';
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CollapsibleContainer = ({
  title,
  subtitle,
  author,
  buttonText,
  initialExpanded = false,
  backgroundColor = Colors.primary,
  screen, // Default background color
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const animatedHeight = useSharedValue(0);
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';
  const animatedBackgroundColor = useSharedValue(backgroundColor);

  animatedBackgroundColor.value = !expanded
    ? withTiming(theme.colors.background)
    : withTiming(backgroundColor);
  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withSpring(200) : withSpring(75);

    return {
      height: animatedHeight.value,
      backgroundColor: animatedBackgroundColor.value,
      ...styles.wrap,
      shadowColor: isDarkMode ? '#fff' : '#000',
    };
  }, [expanded]);

  const handlePress = () => {
    setExpanded(!expanded);

    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
      <Animated.View style={[collapsableStyle]}>
        {fontsLoaded ? (
          <Text
            style={[
              styles.title,
              { color: expanded ? '#fff' : isDarkMode ? '#fff' : '#000' },
            ]}
          >
            {title}
          </Text>
        ) : (
          <Text>Loading fonts...</Text>
        )}
        {expanded && (
          <View style={{padding: 20}}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.author}>{author}</Text>
            
            <Link href={screen} asChild>
            <Pressable>
              
              <View style={[styles.buttonCard, { backgroundColor: '#fff' }]}>
                
                <Text style={styles.buttonText}>{buttonText}</Text>
                
              </View>
              
              </Pressable>
            </Link>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: Platform.OS === 'ios' ? '98%' : '98%',
    borderRadius: 25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  buttonCard: {
    height: 65,
    width: Platform.OS === 'ios' ? 270 : 280,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    borderRadius: Platform.OS === 'ios' ? 25 : 20,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 17,
    color: Colors.textGrey,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    alignSelf: 'flex-start',
    padding: 20,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'NotoSerif_400Regular',
    color: '#E8E8E8',
    alignSelf: 'flex-start',
    bottom: 30,
    right: Platform.OS === 'ios' ? 15 : 28,
  },
  author: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    alignSelf: 'flex-start',
    bottom: 25,
    right: Platform.OS === 'ios' ? 15 : 28,
    color: '#fff',
  },
});

export default CollapsibleContainer;
