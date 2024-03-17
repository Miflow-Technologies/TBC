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
import { db } from '@/config/firebaseConfig';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';

const DevotionalManagementScreen = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const [devotionalPosts, setDevotionalPosts] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    const fetchDevotionalPosts = async () => {
      const devotionalsQuery = collection(db, 'devotionals');
      const snapshot = await getDocs(devotionalsQuery);
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDevotionalPosts(posts);
    };

    fetchDevotionalPosts();
  }, [shouldRefresh]);

  const editDevotional = (devotionalId) => {
    // Implement your logic for editing a devotional
    Alert.alert('Edit Devotional', `Editing devotional with ID: ${devotionalId}`);
    setShouldRefresh(true)
  };

  const deleteDevotional = async (devotionalId) => {
    try {
      // Ask for confirmation before deleting
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this devotional?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteDoc(doc(db, 'devotional', devotionalId));
              setShouldRefresh(true)
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error deleting devotional:', error);
    }
  };

  const toggleIsSet = async (devotionalId) => {
    const devotionalDocRef = doc(db, 'devotionals', devotionalId);
    const docSnap = await getDoc(devotionalDocRef);
    const docData = docSnap.data();

    const isSet = docData.isSet === "1";
    const newIsSetValue = isSet ? "0" : "1";

    const updatedData = { ...docData, isSet: newIsSetValue };
    await updateDoc(devotionalDocRef, updatedData);
    setShouldRefresh(true)
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
        onPress={() => editDevotional(item.id)}
      >
        <Text style={styles.title}>{item.title}</Text>
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
          onPress={() => editDevotional(item.id)}
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
          onPress={() => deleteDevotional(item.id)}
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
      marginHorizontal: 20,
      marginBottom: 20,
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
      color: '#fff' 
    },
  });

  return (
    <SafeAreaView>
      <Header heading='Manage Devotional'/>
      <View
        style={{ marginTop: Platform.OS === 'ios' ? 50 : 10, marginBottom: Platform.OS === 'ios' ? 50 : 260 }}
      >
        <FlatList
          data={devotionalPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default DevotionalManagementScreen;
