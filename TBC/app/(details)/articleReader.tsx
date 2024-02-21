import React, { useEffect } from 'react';
import { View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import  PdfReader  from '@bildau/rn-pdf-reader';

const ArticleReaderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { pdfUrl } = route.params;
  console.log(pdfUrl)

  useEffect(() => {
    if (!pdfUrl) {
      navigation.goBack(); 
    }
  }, [navigation, pdfUrl]);

  return (
      <PdfReader
        source={{
          uri : pdfUrl
        }}
        style={{ flex: 1 }}
      // Add other PdfReader props as needed (e.g., password, initialPage)
    />
  );
};

export default ArticleReaderScreen;
