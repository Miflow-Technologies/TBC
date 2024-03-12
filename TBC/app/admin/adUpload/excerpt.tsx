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
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useNavigation, useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import {  MaterialIcons } from "@expo/vector-icons";

const excerpt = () => {

  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === "dark";

  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [series, setSeries] = useState("");
  const [filename, setFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);


  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      aspect: [3, 4]
    });

    if (!result.canceled) {
      setVideoFile(result.assets[0].uri);
      const filenameParts = result.assets[0].uri.split("/");
      setFilename(filenameParts[filenameParts.length - 1]);
    }
  }


  async function handleUpload() {
    if (videoFile) {
      setIsUploading(true);
      await upload(videoFile);
    } else {
      alert("Please select a video first.");
    }
  }
  
  async function upload(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const storageRef = ref(storage, "Excerpt/" + new Date().getTime());
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
            preacher,
            series,
            new Date().getTime()
          );
          setVideoFile("");
          console.log("Upload completed");
          setIsUploading(false);
          navigation.navigate('admin/adManage/excerpt')
        } catch (error) {
          console.error("Error getting download URL or saving record:", error);
        }
      }
    );
  }
  
  async function saveRecord(url, title, preacher, series, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "excerpt"), {
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
      <Header heading="Excerpt" />
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
              placeholder="Enter your excerpt title"
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
            Add Video
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => pickVideo()} style={{ width: 50 }}>
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
                <MaterialIcons
                  name="video-call"
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

export default excerpt;
