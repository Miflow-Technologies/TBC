import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '@/config/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const DevotionalUpload = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [biblePassage, setBiblePassage] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const uploadDevotional = async () => {
    try {
      // Reference to the "devotionals" collection
      const devotionalsCollection = collection(db, 'devotionals');

      // Add a new devotional to the "devotionals" collection
      await addDoc(devotionalsCollection, {
        title,
        biblePassage,
        content,
        author,
      });

      // Navigate back or perform any other navigation logic
      navigation.goBack();
    } catch (error) {
      console.error('Error uploading devotional:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bible Passage"
        value={biblePassage}
        onChangeText={(text) => setBiblePassage(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />
      <Button title="Upload Devotional" onPress={uploadDevotional} />
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

export default DevotionalUpload;

