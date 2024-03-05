import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
  Animated,
  Linking,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import { NotoSerif_400Regular } from "@expo-google-fonts/noto-serif";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import Mailer from 'react-native-mail';

const settings = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    NotoSerif_400Regular,
  });

  const handleEmailClick = (title) => {
    const recipient = 'danbis664@gmail.com'
    const subject = title;
    const body = `Hi,\n\nI'd like to ${title.toLowerCase()}. \n\n(Optional: Add additional details here.)`;
  
    const mailOptions = {
      recipients: [recipient],
      subject,
      body,
    };
  
    Mailer.mail(mailOptions, (error, data) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', data);
      }
    });
  };


  const handleShareClick = async () => {
    const message = `Hey, check out this awesome app!`; // Customize your message
  
    // Construct platform-specific app store URLs
    const appStoreUrl = Platform.OS === 'ios' ? 'your_ios_app_store_link' : 'your_android_play_store_link';
  
    const shareOptions = {
      message: `${message} \n${appStoreUrl}`, // Combine message and app store URL
      title: 'Download our App', // Sharing title (optional)
      url: appStoreUrl, // Optional URL for some platforms
    };
  
    try {
      await Share.share(shareOptions);
    } catch (error) {
      console.error('Error sharing app link:', error);
    }
  };

  
  const Card = ({ icon, title, onPress }) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const animatedStyle = {
      transform: [{ scale: scaleValue }],
    };

    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.card, animatedStyle]}>
          <Ionicons
            name={icon}
            size={24}
            color={isDarkMode ? "#fff" : "#000"}
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>{title}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "flex-start",
    },
    containerText: {
      fontFamily: "NotoSerif_400Regular",
      fontSize: 15,
      padding: 10,
      color: isDarkMode ? "#fff" : Colors.textGrey,
    },
    header: {
      top: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    icon: {
      marginRight: 10,
    },
    headerText: {
      alignSelf: "center",
      fontSize: 15,
      fontFamily: "NotoSerif_400Regular",
      color: isDarkMode ? "#fff" : Colors.textGrey,
      bottom: 22,
    },
    card: {
      height: Platform.OS === "ios" ? 70 : 70,
      width: "90%",
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 10,
      alignSelf: "center",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowColor: isDarkMode ? "#fff" : "#000",
      elevation: 3,
    },
    cardIcon: {
      marginLeft: 20,
    },
    cardText: {
      marginLeft: 20,
      color: isDarkMode ? "#fff" : "#000",
      fontFamily: "Poppins_500Medium",
      fontSize: 17,
    },
  });

  if (fontsLoaded) {
    return (
      <SafeAreaView>
        <Header heading={"SETTINGS"} />
        <ScrollView
          style={{ top: 10, marginBottom: Platform.OS == "ios" ? 50 : 70 }}
        >
          <View style={styles.container}>
            <Text style={styles.containerText}>Personal Settings</Text>

            {/*<Card title="Dark Mode" icon="moon-outline" route="(modal)/mode" />*/}
            <Card
              title="Invite Friends and Family"
              icon="people-outline"
              onPress={() => handleShareClick()}
            />
            {/*<Card
              title="Notifications"
              icon="ios-notifications-outline"
              route="(modal)/fil"
            />*/}

            <Text style={styles.containerText}>About</Text>

            <Card
              title="About The Developers"
              icon="code-outline"
              onPress={undefined}
            />
            <Card
              title="Privacy and Policy"
              icon="shield-checkmark-outline"
              onPress={() => navigation.navigate('(modals)/pnp')}
            />
            <Card
              title="Terms and Conditions"
              icon="newspaper-outline"
              onPress={() => navigation.navigate('(modals)/tsnCs')}
            />

            <Text style={styles.containerText}>Get in Touch</Text>

            <Card 
              title="Give Feedback"
              icon="chatbox-ellipses-outline"
              onPress={() => handleEmailClick("Give Feedback")}
            />
            <Card
              title="Get Support"
              icon="send-outline"
              onPress={() => handleEmailClick("Give Support")}
            />
          </View>
          <Text
            style={[
              styles.containerText,
              {
                alignSelf: "center",
                marginTop: Platform.OS === "ios" ? 10 : 20,
              },
            ]}
          >
            VERSION 1.0.0
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    console.log("Fonts are still loading...");
  }
};

export default settings;
