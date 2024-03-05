
import Header from '@/components/Header'
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { query, collection, getDocs} from 'firebase/firestore'; 
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '@/config/firebaseConfig';
import { useAudioContext } from '../context/audio';
import PlayerWidget from '@/components/playerWidget';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '@/components/searchBar';

const Goaks = () => {
    const { playSong } = useAudioContext();

    const [goaksSongs, setGoaksSongs] = useState([]);;
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';

    const [fontsLoaded] = useFonts({
      Poppins_500Medium,
      Poppins_700Bold,
      NotoSerif_400Regular,
      NotoSerif_700Bold,
    });
    const { setSongs, isPlaying, isPaused } = useAudioContext();

    useEffect( ()=> {
        const fetchGoaksSongs = async () => {
            try {
              const goaksSongsQuery = query(collection(db, 'goaksSongs'));
              const goaksSongsSnapshot = await getDocs(goaksSongsQuery);
          
              const fetchedGoaksSongs = await Promise.all(
                goaksSongsSnapshot.docs.map(async (doc) => {
                  const audioDownloadUrl = await getDownloadURL(ref(storage, doc.data().audioUrl));
                  const imageDownloadUrl = await getDownloadURL(ref(storage, doc.data().imageUrl));
                  return {
                    id: doc.id,
                    title: doc.data().title,
                    artist: doc.data().preacher,
                    audioUrl: audioDownloadUrl,
                    imageUrl: imageDownloadUrl,
                    isFeatured: doc.data().isFeatured,
                  };
                })
              );
          
              setGoaksSongs(fetchedGoaksSongs);
              setSongs(fetchedGoaksSongs);
              console.log('Fetched Audio Sermons:', fetchedGoaksSongs);
            } catch (error) {
              console.error('Error fetching audio sermons:', error);
            }
          };
          fetchGoaksSongs()
          }, [] )

        
        const renderItem = ({ item }) => (
            <Pressable onPress={() => playSong(item)}>
                <View style={styles.queueItem}>
                    <Image style={styles.queueThumbnail} source={{ uri: item.imageUrl }} />
                    <View style={styles.queueDetails}>
                        <Text style={{color: '#fff', fontFamily: 'Poppins_500Medium'}}>{item.title}</Text>
                        <Text style={styles.queueArtist}>{item.preacher}</Text>
                    </View>
                </View>
            </Pressable>
        );

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10}}>
            <FlatList style={{ paddingHorizontal: 24 }}
                data={goaksSongs}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
        {isPlaying ? <PlayerWidget style={90}/> : isPaused ? <PlayerWidget style={90}/> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    queueList: {
      padding: 16,
    },
    queueItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    queueThumbnail: {
      width: 40,
      height: 40,
      borderRadius: 0,
    },
    queueDetails: {
      flex: 1,
      marginHorizontal: 6,
    },
    queueArtist: {
      color: '#888',
    },
  });

export default Goaks

