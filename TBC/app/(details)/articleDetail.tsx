import React from 'react';
import { View, StyleSheet } from 'react-native';
import PDFView from 'react-native-view-pdf/lib/index';

const articleReader: React.FC<{ pdfUri: string }> = ({ pdfUri }) => {
  const resourceType = 'url';

  return (
    <View style={styles.mainView}>
      <PDFView
        fadeInDuration={250.0}
        style={styles.pdfView}
        resource={{ uri: pdfUri }}
        resourceType={resourceType}
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

export default articleReader;
