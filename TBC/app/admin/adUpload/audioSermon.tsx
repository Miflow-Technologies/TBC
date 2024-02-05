import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useNavigation, useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const AudioSermon = () => {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("");
  const [series, setSeries] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [audioFilename, setAudioFilename] = useState("");
  const [audioBlob, setAudioBlob] = useState(null); // New state for audio blob
  const [imageFile, setImageFile] = useState("");
  const [imageFilename, setImageFilename] = useState("");
  const [imageBlob, setImageBlob] = useState(null); // New state for image blob

  async function pickAudio() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Specify the MIME type for audio files
        copyToCacheDirectory: false,
      });

      if (!result.canceled) {
        setAudioFile(result.assets[0].uri);
        setAudioFilename(result.assets[0].name);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        setAudioBlob(blob);
      }
    } catch (error) {
      console.error("Error picking audio:", error);
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4],
    });

    if (!result.canceled) {
      setImageFile(result.assets[0].uri);
      const filenameParts = result.assets[0].uri.split("/")
      setImageFilename(filenameParts[filenameParts.length - 1]);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setImageBlob(blob);
    }
  }

  async function handleUpload() {
    if (audioFile && imageFile) {
      await upload(audioBlob, imageBlob);
    } else {
      alert("Please select both audio and album art.");
    }
  }

  async function upload(audioBlob, imageBlob) {
    const audioStorageRef = ref(storage, "audioSermon/" + new Date().getTime());
    const audioUploadTask = uploadBytesResumable(audioStorageRef, audioBlob);

    const imageStorageRef = ref(storage, "albumArt/" + new Date().getTime());
    const imageUploadTask = uploadBytesResumable(imageStorageRef, imageBlob);

    const [audioSnapshot, imageSnapshot] = await Promise.all([
      audioUploadTask,
      imageUploadTask,
    ]);

    try {
      const audioDownloadUrl = await getDownloadURL(audioSnapshot.ref);
      const imageDownloadUrl = await getDownloadURL(imageSnapshot.ref);

      await saveRecord(
        audioDownloadUrl,
        imageDownloadUrl,
        title,
        preacher,
        series,
        new Date().getTime()
      );

      setAudioFile("");
      setImageFile("");
      console.log("Upload completed");
      navigation.navigate("admin/adManage/audioSermon");
    } catch (error) {
      console.error("Error getting download URL or saving record:", error);
    }
  }

  async function saveRecord(
    audioUrl,
    imageUrl,
    title,
    preacher,
    series,
    createdAt
  ) {
    try {
      const docRef = await addDoc(collection(db, "audioSermon"), {
        audioUrl,
        imageUrl,
        title,
        preacher,
        series,
        createdAt,
        isFeatured: "0",
      });
      console.log("Record saved with document ID:", docRef.id);
    } catch (e) {
      console.error("Error saving record:", e);
    }
  }

    
  
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}
      >
        <Header heading="Audio Sermon" />
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
              Preacher
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
                placeholder="Enter preachers name"
                onChangeText={(text) => setPreacher(text)}
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
              Series
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
                placeholder="Enter series name if applicable"
                onChangeText={(text) => setSeries(text)}
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
              Add Audio
            </Text>
  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => pickAudio()} style={{ width: 50 }}>
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
                {audioFilename}
              </Text>
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
              Add Album Cover
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
                  <Ionicons name="image" size={24} color={isDarkMode ? "#fff" : "#000"}/>
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
                {imageFilename}
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
  
  export default AudioSermon;
  