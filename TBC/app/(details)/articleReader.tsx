import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

const articleReader= () => {
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
    <View style={styles.container}>
        {pdfUrl &&
        <Pdf
            trustAllCerts={false}
            source={{
            uri: pdfUrl,
            cache: true,
            }}
            onLoadComplete={(numberOfPages) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page,numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}/>
        }
    </View>
)
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
});

export default articleReader