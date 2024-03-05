import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsAndConditions = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.modalContainer}>
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.contentText}>
          These are the terms and conditions governing your use of this application. Please read these terms and conditions carefully before using our app.

          By using this app, you agree to these terms and conditions. If you do not agree to these terms and conditions, you may not use our app.

          We reserve the right to modify these terms and conditions at any time without prior notice.

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

export default TermsAndConditions;
