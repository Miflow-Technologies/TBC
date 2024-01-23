import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
  Dimensions,
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
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '@/config/firebaseConfig';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { Video } from 'expo-av';


const Inspirational = () => {
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

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosRef = collection(db, 'inspirational');
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
            };
          })
        );

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
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
    }

  const VideoComponent = ({ videoUrl }) => (
    <View style={styles.thumbnailContainer}>
      <Video
        style={styles.thumbnail}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        isLooping
        resizeMode='contain'
        onFullscreenUpdate={onFullscreenUpdate}
      />
    </View>
  );

  const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

  const Preacher = ({ children }) => <Text style={styles.preacher}>{children}</Text>;

  const Duration = ({ children }) => <Text style={styles.duration}>{children}.Min</Text>;

  const Series = ({ children }) => <Text style={styles.series}>{children}</Text>;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    flatListContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoCard: {
      backgroundColor: theme.colors.background,
      borderColor: isDarkMode ? '#000' : '#E7E3EB',
      borderRadius: 12,
      borderWidth: 1,
      height: Platform.OS === 'ios' ? 250 : 250,
      width: Platform.OS === 'ios' ? 300 : 300,
      padding: 12,
      marginVertical: 10,
      shadowColor: isDarkMode ? '#fff' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
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
      <Header heading='Manage inspirational' />
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
              <Duration>{item.duration}</Duration>
              <Series>{item.series}</Series>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Inspirational;
