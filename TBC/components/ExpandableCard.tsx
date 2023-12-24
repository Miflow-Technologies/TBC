import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import React, { useState } from 'react';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Poppins_500Medium, Poppins_700Bold, useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, useFonts as useNotoFonts } from '@expo-google-fonts/noto-serif';
import Colors from '@/constants/Colors';

export type ListItemType = {
    title: string;
    subtitle: string;
    details: string;
    image: string;
  };

const [poppinsFontsLoaded] = usePoppinsFonts({
    Poppins_500Medium,
    Poppins_700Bold
});
const [notoFontsLoaded] = useNotoFonts({
    NotoSerif_400Regular,
    NotoSerif_700Bold
});
const colorScheme = useColorScheme();
const theme = useTheme();
const isDarkMode = colorScheme === 'dark';

export const CollapsableContainer = ({
  children,
  expanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
}) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const [backgroundColor, setBackgroundColor] = useState(theme.colors.background); // Initial color
  const animatedBackgroundColor = useSharedValue(theme.colors.background);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);
    animatedBackgroundColor.value = expanded
      ? withTiming(Colors.primary) // Change color when expanded
      : withTiming(theme.colors.background);

    return {
      height: animatedHeight.value,
      backgroundColor: animatedBackgroundColor.value,
    };
  }, [expanded]);

  return (
    <Animated.View style={[collapsableStyle, { overflow: 'hidden' }]}>
      <View style={{ position: 'absolute' }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

export
 
const ExpandableCard = ({ item }: { item: ListItemType }) => {
    if (!notoFontsLoaded) {
        return null
    }
    if (!poppinsFontsLoaded) {
        return null
    }
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Add haptic feedback
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onItemPress}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.subtitle}</Text>
          </View>
          <Text style={styles.readButton}>Read</Text>
        </View>
      </TouchableOpacity>

      <CollapsableContainer expanded={expanded}>
        <Text style={[styles.details, styles.text]}>{item.details}</Text>
      </CollapsableContainer>
    </View>
  );
};


  const styles = StyleSheet.create({
    wrap: {
      borderColor: "#ccc",
      borderWidth: 1,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.2,
    },
    container: { flexDirection: "row" },
    textContainer: { justifyContent: "space-around" },
    details: { margin: 10 },
    text: { opacity: 0.7 },
  });


