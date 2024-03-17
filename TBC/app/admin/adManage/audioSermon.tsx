
import Header from '@/components/Header'
import { SafeAreaView, StyleSheet, Text, View, FlatList, Platform, TouchableOpacity, Image, Pressable, Alert, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold, } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { query, collection, getDocs, doc, getDoc, deleteDoc} from 'firebase/firestore'; 
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '@/config/firebaseConfig';
import { useAudioContext } from '@/app/context/audio';
import PlayerWidget from '@/components/playerWidget';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from '@/components/searchBar';




const audioSermon = () => {
  const { setSongs, isPlaying, isPaused } = useAudioContext();

    const [audioSermons, setAudioSermons] = useState([]);;
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
  
  


    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';

    const [fontsLoaded] = useFonts({
      Poppins_500Medium,
      Poppins_700Bold,
      NotoSerif_400Regular,
      NotoSerif_700Bold,
    });

    const handleOptions = (item) => {
      setSelectedItem(item);
      setModalVisible(true);
    };
  
    const handleEdit = () => {
      // Handle Edit functionality for the selected item
      setModalVisible(false);
    };
  
    const deleteAudioSermon = async (audioSermonId) => {
      try {
        const confirmation = Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this audio sermon?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              onPress: async () => {
                const audioSermonDocRef = doc(db, 'audioSermon', audioSermonId);
                const quoteSnap = await getDoc(audioSermonDocRef);
                const quoteData = quoteSnap.data();

                const photoUrl = quoteData.imageDownloadUrl;
                const audioUrl = quoteData.audioDownloadUrl;

                if (photoUrl && audioUrl) {
                  const photoStorageRef = ref(storage, photoUrl);
                  const audioStorageRef = ref(storage, audioUrl);
                  await deleteObject(photoStorageRef);
                  await deleteObject(audioStorageRef);
                }
                await deleteDoc(doc(db, 'audioSermon', audioSermonId));
                setSelectedItem(null);
                setModalVisible(false);
              },
            },
          ]
        );
      } catch (error) {
        console.error('Error deleting audio sermon:', error);
      }
    };

    useEffect( ()=> {
        const fetchAudioSermons = async () => {
            try {
              const audioSermonsQuery = query(collection(db, 'audioSermon'));
              const audioSermonsSnapshot = await getDocs(audioSermonsQuery);
          
              const fetchedAudioSermons = await Promise.all(
                audioSermonsSnapshot.docs.map(async (doc) => {
                  const audioDownloadUrl = await getDownloadURL(ref(storage, doc.data().audioUrl));
                  const imageDownloadUrl = await getDownloadURL(ref(storage, doc.data().imageUrl));
                  return {
                    id: doc.id,
                    title: doc.data().title,
                    preacher: doc.data().preacher,
                    series: doc.data().series,
                    audioUrl: audioDownloadUrl,
                    imageUrl: imageDownloadUrl,
                    isFeatured: doc.data().isFeatured,
                  };
                })
              );
          
              setAudioSermons(fetchedAudioSermons);
              setSongs(fetchedAudioSermons);
              console.log('Fetched Audio Sermons:', fetchedAudioSermons);
            } catch (error) {
              console.error('Error fetching audio sermons:', error);
            }
          };
          fetchAudioSermons()
          }, [] )

        
        const renderItem = ({ item }) => (
            <Pressable onPress={() => playSong(item)}>
                <View style={styles.queueItem}>
                    <Image style={styles.queueThumbnail} source={{ uri: item.imageUrl }} />
                    <View style={styles.queueDetails}>
                        <Text style={{color: isDarkMode ? '#fff' : '#000', fontFamily: 'Poppins_700Bold', fontSize: 17}}>{item.title}</Text>
                        <Text style={{color: isDarkMode ? '#fff' : '#000'}}>{item.preacher}</Text>
                    </View>
                    <Pressable onPress={() => handleOptions(item)} style={styles.optionsButton}>
                      <MaterialCommunityIcons name='dots-vertical' size={24} color={isDarkMode ? '#fff' : '#000'}/>
                    </Pressable>
                </View>
            </Pressable>
        );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Header heading="Audio List" />
    <SearchBar dbName="audioSermon" renderItem={renderItem} />
    <View style={{ padding: 10 }}>
      <FlatList
        style={{ paddingHorizontal: 24 }}
        data={audioSermons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
    
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={[styles.modalOption, {backgroundColor: isDarkMode ? '#fff' : '#000',}]} onPress={handleEdit}>
            <Text style={[styles.modalOptionText, {color: isDarkMode ? '#000' : '#fff',}]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalOption, {backgroundColor: isDarkMode ? '#fff' : '#000',}]} onPress={() => deleteAudioSermon(selectedItem.id)}>
            <Text style={[styles.modalOptionText, {color: isDarkMode ? '#000' : '#fff',}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
      width: 60,
      height: 60,
      borderRadius: 0,
    },
    queueDetails: {
      flex: 1,
      marginHorizontal: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalOption: {
      padding: 10,
      margin: 10,
      borderRadius: 5,
    },
    modalOptionText: {
      fontSize: 16,
    },

  });

export default audioSermon
