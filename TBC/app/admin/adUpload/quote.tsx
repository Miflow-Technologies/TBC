import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '@/config/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const DailyQuoteUpload = () => {
  const navigation = useNavigation();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const uploadDailyQuote = async () => {
    try {
      // Add a new daily quote to the "daily-quotes" collection
      await addDoc(collection(db, 'daily-quotes'), {
        backgroundImage,
        author,
        content,
      });

      // Navigate back or perform any other navigation logic
      navigation.goBack();
    } catch (error) {
      console.error('Error uploading daily quote:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Background Image URL"
        value={backgroundImage}
        onChangeText={(text) => setBackgroundImage(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button title="Upload Daily Quote" onPress={uploadDailyQuote} />
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

export default DailyQuoteUpload;
