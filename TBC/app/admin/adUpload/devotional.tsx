import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { db} from "@/config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useNavigation, useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";


const DevotionalUpload = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [biblePassage, setBiblePassage] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isUploading, setIsUploading] = useState(false);


  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === "dark";

  const uploadDevotional = async () => {
    try {
      setIsUploading(true);
      const devotionalsCollection = collection(db, 'devotionals');

    
      await addDoc(devotionalsCollection, {
        title,
        biblePassage,
        content,
        author,
      });

      setIsUploading(false);
      navigation.navigate('admin/adManage/devotional');
    } catch (error) {
      console.error('Error uploading devotional:', error);
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView
    style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}>
    <Header heading="Upload Devotional" />
    <View style={{ flex: 1, marginHorizontal: 22 }}>
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          Title
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: isDarkMode ? "#fff" : "#000",
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 12,
          }}
        >
          <TextInput
            placeholder="Enter your devotional title"
            onChangeText={(text) => setTitle(text)}
            placeholderTextColor={isDarkMode ? "#fff" : Colors.textGrey}
            style={{
              width: "100%",
              color: isDarkMode ? "#fff" : "#000",
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          Bible Passage
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: isDarkMode ? "#fff" : "#000",
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 12,
          }}
        >
          <TextInput
            placeholder="Enter Devotional Bible Passage"
            onChangeText={(text) => setBiblePassage(text)}
            placeholderTextColor={isDarkMode ? "#fff" : Colors.textGrey}
            style={{
              width: "100%",
              color: isDarkMode ? "#fff" : "#000",
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          Author
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: isDarkMode ? "#fff" : "#000",
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 12,
          }}
        >
          <TextInput
            placeholder="Enter Author"
            onChangeText={(text) => setAuthor(text)}
            placeholderTextColor={isDarkMode ? "#fff" : Colors.textGrey}
            style={{
              width: "100%",
              color: isDarkMode ? "#fff" : "#000",
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          Content
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: isDarkMode ? "#fff" : "#000",
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 12,
          }}
        >
          <TextInput
            placeholder="Enter Devotional Content"
            onChangeText={(text) => setContent(text)}
            multiline={true}
            textAlignVertical="top"
            returnKeyLabel="none"
            placeholderTextColor={isDarkMode ? "#fff" : Colors.textGrey}
            style={{
              width: "100%",
              color: isDarkMode ? "#fff" : "#000",
            }}
          />
        </View>
      </View>


      <Button
        title={isUploading ? "Uploading..." : "Upload"}
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        onPress={() => uploadDevotional()}
      />
      {isUploading && (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#000"} />
        </View>
      )}  
    </View>
  </SafeAreaView>
  );
};


export default DevotionalUpload;

