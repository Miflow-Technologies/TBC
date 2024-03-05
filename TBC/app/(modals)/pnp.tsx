import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.modalContainer}>
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>
        This Privacy Policy describes how we collect, use, and disclose your personal information when you use our application and the choices you have associated with that data.

        **Information We Collect**

        We collect several different types of information for various purposes to improve our service to you.

        ... 

        **Use of Your Information**

        We use the information we collect in various ways to improve our service to you.


        **Your Choices**

        You have several choices regarding your information:
                ... 
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    padding: 10,
    alignItems: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentText: {
  },
});

export default PrivacyPolicy;
