import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts as usePoppinsFonts,
} from '@expo-google-fonts/poppins';
import {
  NotoSerif_400Regular,
  useFonts as useNotoFonts,
} from '@expo-google-fonts/noto-serif';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '@/config/firebaseConfig';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const Excerpt = (props) => {
  const [poppinsFontsLoaded] = usePoppinsFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const [notoFontsLoaded] = useNotoFonts({
    NotoSerif_400Regular,
  });

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  const [videos, setVideos] = useState([]);

  const [videoStates, setVideoStates] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosRef = collection(db, 'excerpt');
        const querySnapshot = await getDocs(videosRef);

        const fetchedVideos = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const downloadUrl = await getDownloadURL(ref(storage, doc.data().url));
            return {
              id: doc.id,
              title: doc.data().title,
              preacher: doc.data().preacher,
              series: doc.data().series,
              videoUrl: downloadUrl,
              isFeatured: doc.data().isFeatured,
            };
          })
        );

        console.log(`LOG Fetched Latest Videos for ${videos}:`, fetchedVideos);

        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  if (!poppinsFontsLoaded || !notoFontsLoaded) {
    // Fonts are still loading, return a placeholder or loading screen
    return null;
  }

  const onFullscreenUpdate = async () => {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  const VideoComponent = ({ videoUrl }) => (
    <View style={styles.thumbnailContainer}>
      <Video
        style={styles.thumbnail}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        isLooping
        resizeMode="contain"
        onFullscreenUpdate={onFullscreenUpdate}
      />
    </View>
  );

  const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

  const Preacher = ({ children }) => <Text style={styles.preacher}>{children}</Text>;

  const Series = ({ children }) => <Text style={styles.series}>{children}</Text>;

  // Function to handle Edit button press (placeholder implementation)
  const handleEditPress = (videoId) => {
    // Replace this with your logic for navigating to an edit screen or handling edit functionality
    console.log(`Edit button pressed for video: ${videoId}`);
    Alert.alert('Edit Functionality', 'Edit functionality is not yet implemented.');
  };

    // Function to handle Delete button press (placeholder implementation)
    const handleDeletePress = async (videoId) => {
      try {
        const response = await Alert.alert(
          'Confirm Delete',
          'Are you sure you want to delete this video?',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel deletion') },
            {
              text: 'Delete',
              onPress: async () => {
                // Delete video from Firestore and Storage
                const videoDocRef = doc(db, 'excerpt', videoId);
                await deleteDoc(videoDocRef);
  
                // Replace this with your logic for deleting the video file from storage
                // (consider using appropriate storage functions from firebase/storage)
                console.log(`Placeholder: Video with ID ${videoId} deleted from Firestore.`);
                setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
              },
              style: 'destructive',
            },
          ]
        );
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    };
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      flatListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      videoCard: {
        height: Platform.OS === 'ios' ? 262 : 262,
        width: Platform.OS === 'ios' ? 176 : 176,
        marginRight: 16,
        marginBottom: 10,
      },
      videoInfo: {
        textAlign: 'flex-start',
        paddingTop: 10,
      },
      thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      thumbnail: {
        borderRadius: 8,
        height: 150,
        width: 270,
      },
      title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 15,
        textTransform: 'uppercase',
        color: isDarkMode ? '#fff' : '#000',
      },
      preacher: {
        fontFamily: 'NotoSerif_400Regular',
        fontSize: 12,
        color: isDarkMode ? '#fff' : Colors.textGrey,
      },
      duration: {
        fontFamily: 'NotoSerif_400Regular',
        fontSize: 10,
        color: isDarkMode ? '#fff' : Colors.textGrey,
        bottom: -10,
      },
      series: {
        fontFamily: 'NotoSerif_400Regular',
        fontSize: 10,
        alignSelf: 'flex-end',
        bottom: 5,
        right: 10,
        color: isDarkMode ? '#fff' : Colors.textGrey,
      },
    });
  
    return (
      <SafeAreaView style={styles.container}>
        <Header heading="Manage Excerpts" />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.videoCard}>
              <VideoComponent videoUrl={item.videoUrl} />
              <View style={styles.videoInfo}>
                <Title>{item.title}</Title>
                <Preacher>{item.preacher}</Preacher>
                <Series>{item.series}</Series>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {/* Edit button (placeholder implementation) */}
                  <IconButton icon="pencil-outline" onPress={() => handleEditPress(item.id)} />
                  {/* Delete button */}
                  <IconButton icon="trash-outline" onPress={() => handleDeletePress(item.id)} />
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    );
  };
  
  const IconButton = ({ icon, onPress }) => (
    <Ionicons name={icon} size={24} onPress={onPress} style={{ marginRight: 10 }} />
  );
  
  export default Excerpt;
  