import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

const AnnouncementsUpload = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const uploadAnnouncement = async () => {
    try {
      // Add a new announcement to the "announcementPosts" collection
      await addDoc(collection(db, 'announcementPosts'), {
        image,
        description,
        timestamp,
      });

      // Navigate back or perform any other navigation logic
      navigation.goBack();
    } catch (error) {
      console.error('Error uploading announcement:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Timestamp"
        value={timestamp}
        onChangeText={(text) => setTimestamp(text)}
      />
      <Button title="Upload Announcement" onPress={uploadAnnouncement} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default AnnouncementsUpload;
