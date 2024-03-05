import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { WebBrowser } from 'expo-web-browser';
import { TailwindProvider } from 'tailwindcss-react-native'; // Assuming Tailwind CSS for styling

const ArticleReaderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [tries, setTries] = useState(1); // Track retries for Android refresh
  const [reset, setReset] = useState(Date.now()); // For refresh mechanism

  useEffect(() => {
    const { pdfUrl: routePdfUrl } = route.params;

    if (!routePdfUrl) {
      navigation.goBack();
      return;
    }

    setIsLoading(true); // Set loading state initially
    console.log('Fetching PDF:', routePdfUrl); // Log the PDF URL being fetched
    setPdfUrl(routePdfUrl); // Set pdfUrl inside useEffect
  }, [navigation, route.params]);

  const handleError = (error) => {
    console.error('Error displaying content:', error);
    setIsLoading(false);
  };

  const isPdf = (url) => {
    return url.toLowerCase().endsWith('.pdf');
  };

  const handlePdfLoad = async () => {
    if (isPdf(pdfUrl) && Platform.OS === 'android') {
      console.log(pdfUrl);
      try {
        await WebBrowser.openBrowserAsync(pdfUrl);
        console.log('PDF opened in Chrome tab');
      } catch (error) {
        console.error('Error opening PDF:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const myInjectedJs = `
    (function(){
      window.ReactNativeWebView.postMessage(window.document.baseURI);
    })();`;

  const onMessage = (event: WebViewMessageEvent) => {
    if (Platform.OS !== 'android') return; // Only for Android

    const baseURI = event.nativeEvent.data;

    if (tries === 10) {
      // Retries exhausted, handle the error
      console.error('Failed to load PDF after retries:', pdfUrl);
      navigation.goBack();
    } else if (baseURI !== `${pdfUrl}?t=${reset}`) {
      // Refresh WebView if content doesn't match
      setReset(Date.now());
      setTries(tries + 1);
    }
  };

  return (
    <TailwindProvider>
      <View style={{flex: 1}}>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {pdfUrl && (
          <WebView
            source={{ uri: pdfUrl }}
            onError={handleError}
            onLoadEnd={handlePdfLoad}
            style={{flex: 1}} // Assuming Tailwind styles for full-screen
            mixedContentMode="always"
            originWhitelist={['*']} // Adjust based on your security needs
            injectedJavaScript={myInjectedJs}
            onMessage={onMessage}
          />
        )}
      </View>
    </TailwindProvider>
  );
};

export default ArticleReaderScreen;
