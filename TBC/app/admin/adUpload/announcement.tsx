import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';

const AnnouncementsUpload = () => {
  const navigation = useNavigation();
  const [imageFile, setImageFile] = useState('');
  const [description, setDescription] = useState('');
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
      },
      async () => {
        // Handle successful uploads on complete
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await saveRecord(
            downloadUrl,
            title,
            description,
            new Date().getTime()
          );
          setImageFile("");
          console.log("Upload completed");
          navigation.navigate('admin/adManage/announcement')
        } catch (error) {
          console.error("Error getting download URL or saving record:", error);
        }
      }
    );
  }
  
  async function saveRecord(url, title, description, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "sermon"), {
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            Add Video
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
                <Ionicons
                  name="image-outline"
                  size={24}
                  color={isDarkMode ? "#fff" : "#000"}
                />
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

      <Button title="Upload Announcement" onPress={() => handleUpload()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default AnnouncementsUpload;
