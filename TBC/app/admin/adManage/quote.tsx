import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '@/config/firebaseConfig';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const DailyQuote = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const [dailyQuotePosts, setDailyQuotePosts] = useState([]);

  useEffect(() => {
    const fetchDailyQuotePosts = async () => {
      const dailyQuotesQuery = collection(db, 'dailyQuote');
      const snapshot = await getDocs(dailyQuotesQuery);
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDailyQuotePosts(posts);
    };

    fetchDailyQuotePosts();
  }, []);

  const editDailyQuote = (dailyQuoteId) => {
    // Implement your logic for editing a daily quote
    Alert.alert('Edit Daily Quote', `Editing daily quote with ID: ${dailyQuoteId}`);
  };

  const deleteDailyQuote = async (dailyQuoteId) => {
    try {
      // Ask for confirmation before deleting
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this daily quote?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              const dailyQuoteDocRef = doc(db, 'dailyQuote', dailyQuoteId);
              const quoteSnap = await getDoc(dailyQuoteDocRef);
              const quoteData = quoteSnap.data();
  
              // Get the photo URL from the quote data
              const photoUrl = quoteData.url;
  
              // Delete the photo from Storage if a URL exists
              if (photoUrl) {
                const storageRef = ref(storage, photoUrl);
                await deleteObject(storageRef);
              }
              await deleteDoc(doc(db, 'dailyQuote', dailyQuoteId));
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error deleting daily quote:', error);
    }
  };

  const toggleIsSet = async (dailyQuoteId) => {
    const quoteDocRef = doc(db, 'dailyQuote', dailyQuoteId);
    const docSnap = await getDoc(quoteDocRef);
    const docData = docSnap.data();

    const isSet = docData.isSet === "1";
    const newIsSetValue = isSet ? "0" : "1";

    const updatedData = { ...docData, isSet: newIsSetValue };
    await updateDoc(quoteDocRef, updatedData);
  };


  const renderItem = ({ item }) => (
    <View style={cardStyles.card}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },
          cardStyles.title,
        ]}
        onPress={() => editDailyQuote(item.id)}
      >
        <Text style={styles.title}>{item.author}</Text>
      </Pressable>
      <View style={cardStyles.actions}>
      {item.isSet ? (
        <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: Colors.yellow
          },
          cardStyles.actionButton,
        ]}
          onPress={() => toggleIsSet(item.id)}
        >
          <Text style={styles.actionButtonText}>Unset</Text>
        </Pressable>
      ) : (
        <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: Colors.primary
          },
          cardStyles.actionButton,
        ]}
          onPress={() => toggleIsSet(item.id)}
        >
          <Text style={styles.actionButtonText}>Set</Text>
        </Pressable>
      )}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: Colors.blue
            },
            cardStyles.actionButton,
          ]}
          onPress={() => editDailyQuote(item.id)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: Colors.red,
            },
            cardStyles.actionButton,
          ]}
          onPress={() => deleteDailyQuote(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      borderColor: isDarkMode ? '#000' : '#E7E3EB',
      borderRadius: 12,
      borderWidth: 1,
      margin: 20,
      padding: 12,
      shadowColor: isDarkMode ? '#fff' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      alignSelf: 'flex-start',
      padding: 10,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    actionButton: {
      flex: 1,
      borderRadius: 8,
      paddingVertical: 8,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Poppins_700Bold',
      fontSize: 20,
      textTransform: 'uppercase',
      color: isDarkMode ? '#fff' : '#000',
    },
    actionButtonText: {
      color: '#fff',
    },
  });

  return (
    <SafeAreaView>
      <Header heading='Manage Quotes'/>
      <View
        style={{ marginTop: Platform.OS === 'ios' ? 70 : 100, marginBottom: Platform.OS === 'ios' ? 240 : 260 }}
      >
        <FlatList
          data={dailyQuotePosts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default DailyQuote;
