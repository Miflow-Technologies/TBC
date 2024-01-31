import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

const AnnouncementManagementScreen = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  const [announcementPosts, setAnnouncementPosts] = useState([]);

  useEffect(() => {
    const fetchAnnouncementPosts = async () => {
      const announcementsQuery = collection(db, 'announcementPosts');
      const snapshot = await getDocs(announcementsQuery);
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncementPosts(posts);
    };

    fetchAnnouncementPosts();
  }, []);

  const editAnnouncement = (announcementId) => {
    // Implement your logic for editing an announcement
    Alert.alert('Edit Announcement', `Editing announcement with ID: ${announcementId}`);
  };

  const deleteAnnouncement = async (announcementId) => {
    try {
      // Ask for confirmation before deleting
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this announcement?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteDoc(doc(db, 'announcementPosts', announcementId));
              // Refresh the announcements list
              fetchAnnouncementPosts();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
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
        onPress={() => editAnnouncement(item.id)}
      >
        <Text style={styles.title}>{item.description}</Text>
      </Pressable>
      <View style={cardStyles.actions}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? theme.colors.primary : theme.colors.background,
            },
            cardStyles.actionButton,
          ]}
          onPress={() => editAnnouncement(item.id)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? theme.colors.error : theme.colors.background,
            },
            cardStyles.actionButton,
          ]}
          onPress={() => deleteAnnouncement(item.id)}
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
      <CustomHeader name="Announcement Management" />
      <View
        style={{ marginTop: Platform.OS === 'ios' ? 70 : 100, marginBottom: Platform.OS === 'ios' ? 240 : 260 }}
      >
        <FlatList
          data={announcementPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default AnnouncementManagementScreen;
