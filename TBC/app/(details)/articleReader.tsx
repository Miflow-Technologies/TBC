import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf'

const articleDetail = ({pdfUrl}) => {

  const PdfResource = { uri: pdfUrl, cache: true };

  return (
    <View style={styles.mainView}>
      <Pdf
        trustAllCerts={false}
        source={PdfResource}
        style={styles.pdfView}
        onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
        }}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdfView: {
    height: '100%',
    width: '100%',
  },
});

export default articleDetail;
