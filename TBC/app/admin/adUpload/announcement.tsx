import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
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


const AnnouncementsUpload = () => {
  const navigation = useNavigation();
  const [imageFile, setImageFile] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);



  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === "dark";

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageFile(result.assets[0].uri);
      const filenameParts = result.assets[0].uri.split("/");
      setFilename(filenameParts[filenameParts.length - 1]);
    }
  }
  async function handleUpload() {
    if (imageFile) {
      setIsUploading(true);
      await upload(imageFile);
    } else {
      alert("Please select a video first.");
    }
  }
  
  async function upload(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const storageRef = ref(storage, "Announcements/" + new Date().getTime());
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
        setIsUploading(false);
      },
      async () => {
        // Handle successful uploads on complete
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await saveRecord(
            downloadUrl,
            title,
            description,
            new Date().getMinutes()
          );
          setImageFile("");
          console.log("Upload completed");
          setIsUploading(false);
          navigation.navigate('admin/adManage/announcement')
        } catch (error) {
          console.error("Error getting download URL or saving record:", error);
          setIsUploading(false);
        }
      }
    );
  }
  
  async function saveRecord(url, title, description, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "announcement"), {
        url,
        title,
        description,
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
            placeholder="Enter your sermon title"
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
          Description
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
            placeholder="Enter your sermon title"
            onChangeText={(text) => setDescription(text)}
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
          Add PDF
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", }}>
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
              <Ionicons name="radio-outline" size={24} color={isDarkMode ? "#fff" : "#000"}/>
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
        title={isUploading ? "Uploading..." : "Upload"}
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        onPress={() => handleUpload()}
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

export default AnnouncementsUpload;
