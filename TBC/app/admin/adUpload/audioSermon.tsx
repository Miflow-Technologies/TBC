import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    useColorScheme,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import * as DocumentPicker from "expo-document-picker";
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
    const theme = useTheme();
    const isDarkMode = colorScheme === "dark";
  
    const [title, setTitle] = useState("");
    const [preacher, setPreacher] = useState("");
    const [series, setSeries] = useState("");
    const [audioFile, setAudioFile] = useState(""); // New state for audio file
    const [filename, setFilename] = useState(""); // Updated state for filename


  async function pickAudio() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Specify the MIME type for audio files
        copyToCacheDirectory: false,
      });

      if (!result.canceled) {
        setAudioFile(result.assets[0].uri);
        const filenameParts = result.assets[0].uri.split("/");
        setFilename(filenameParts[filenameParts.length - 1]);
      }
    } catch (error) {
      console.error("Error picking audio:", error);
    }
  }

    async function handleUpload() {
      if (audioFile) {
        await upload(audioFile);
      } else {
        alert("Please select a video first.");
      }
    }
    
    async function upload(uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
    
      const storageRef = ref(storage, "Sermon/" + new Date().getTime());
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
              preacher,
              series,
              new Date().getTime()
            );
            setAudioFile("");
            console.log("Upload completed");
            navigation.navigate('admin/adManage/audioSermon')
          } catch (error) {
            console.error("Error getting download URL or saving record:", error);
          }
        }
      );
    }
    
    async function saveRecord(url, title, preacher, series, createdAt) {
      try {
        const docRef = await addDoc(collection(db, "sermon"), {
          url,
          title,
          preacher,
          series,
          createdAt,
          isFeatured: "0",
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
  
  export default AudioSermon;
  