import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { db, storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useNavigation, useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const DailyQuoteUpload = () => {
  const navigation = useNavigation();
  const [imageFile, setImageFile] = useState('');
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState('');
  const [filename, setFilename] = useState("");


  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === "dark";

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4]
    });

    if (!result.canceled) {
      setImageFile(result.assets[0].uri);
      const filenameParts = result.assets[0].uri.split("/");
      setFilename(filenameParts[filenameParts.length - 1]);
    }
  }
  async function handleUpload() {
    if (imageFile) {
      await upload(imageFile);
    } else {
      alert("Please select a video first.");
    }
  }
  
  async function upload(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const storageRef = ref(storage, "dailyQuote/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle upload progress if needed
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
  
        if (snapshot.state === "paused") {
          console.log("Upload paused");
        } else if (snapshot.state === "running") {
          console.log("Upload running");
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error during upload:", error);
      },
      async () => {
        // Handle successful uploads on complete
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await saveRecord(
            downloadUrl,
            content,
            author,
            new Date().getTime()
          );
          setImageFile("");
          console.log("Upload completed");
          navigation.navigate('admin/adManage/dailyQuote')
        } catch (error) {
          console.error("Error getting download URL or saving record:", error);
        }
      }
    );
  }
  
  async function saveRecord(url, content, author, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "dailyQuote"), {
        url,
        content,
        author,
        createdAt,
      });
      console.log("File saved with document ID:", docRef.id);
    } catch (e) {
      console.error("Error saving record:", e);
    }
  }

  return (
    <SafeAreaView
    style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}
  >
    <Header heading="Announcements" />
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
            placeholder="Content"
            multiline
            numberOfLines={4}
            value={content}
            onChangeText={(text) => setContent(text)}
          />
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
          Add Background Image
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => pickImage()} style={{ width: 50 }}>
            <View
              style={{
                width: 50,
                height: 48,
                borderColor: isDarkMode ? "#fff" : "#000",
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 5,
              }}
            >
              <Ionicons name="musical-notes-outline" size={24} color={isDarkMode ? "#fff" : "#000"}/>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 10,
              marginRight: 20,
              color: isDarkMode ? "#fff" : "#000",
            }}
            numberOfLines={2}
          >
            {filename}
          </Text>
        </View>
      </View>

      <Button
        title="Upload"
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        onPress={() => handleUpload()}
      />
    </View>
  </SafeAreaView>
  );
};


export default DailyQuoteUpload;
