import React, { useEffect, useState } from "react";
import { View, Text, Platform, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { NotoSerif_400Regular, NotoSerif_700Bold } from "@expo-google-fonts/noto-serif";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { useTheme } from "@react-navigation/native";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const Devotional = () => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === "dark";

  const [devotionalContent, setDevotionalContent] = useState({
    title: "",
    content: "",
    passage: "", // Added passage to state
  });

  useEffect(() => {
    const fetchDevotionalContent = async () => {
      try {
        const devotionalRef = collection(db, "devotionals");

        // Filter for documents where isSet is a string that evaluates to true (including '0')
        const querySnapshot = await getDocs(devotionalRef);
        const devotionalData = querySnapshot.docs.find(
          (doc) => doc.data().isSet === "1" // Look for exact match with '0'
        );

        if (devotionalData) {
          setDevotionalContent({
            title: devotionalData.data().title || "",
            content: devotionalData.data().content || "",
            passage: devotionalData.data().biblePassage || "",
          });
        } else {
          // Handle no devotional found scenario (optional)
          console.log("No devotional with isSet='0' found");
        }
      } catch (error) {
        console.error("Error fetching devotional content:", error);
      }
    };

    fetchDevotionalContent();
  }, []);



  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      top: 1,
      bottom: 20,
    },
    content: {
      width: "90%",
      alignSelf: "center",
    },
    containerText: {
      fontSize: 15,
      padding: 5,
      color: isDarkMode ? "#fff" : Colors.textGrey,
      textAlign: "justify",
      lineHeight: Platform.OS === "ios" ? 30 : 40,
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: 50,
      paddingLeft: 10,
      backgroundColor: theme.colors.background,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowColor: isDarkMode ? "#fff" : "#000",
      elevation: 3,
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
  });

  const Header = ({ passage }) => {
    return (
      <View style={styles.header}>
        <Link href={"/(tabs)"}>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={isDarkMode ? "#fff" : "#000"}
            style={styles.icon}
          />
        </Link>
        <Text style={styles.headerText}>{passage}</Text>
      </View>
    );
  };

  const Content = ({ title, content }) => {
    return (
      <View style={styles.content}>
        <ScrollView style={{ top: 10, marginBottom: 250 }}>
          <Text style={{ textAlign: "center", fontFamily: "Poppins_500Medium", fontSize: 17, paddingVertical: 20 }}>
            {title}
          </Text>
          <Text style={styles.containerText}>{content}</Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <Header passage={devotionalContent.passage} />
      <View style={styles.container}>
        <Content title={devotionalContent.title} content={devotionalContent.content} />
        <View style={{ top: 20 }}></View>
      </View>
    </View>
  );
};

export default Devotional;
