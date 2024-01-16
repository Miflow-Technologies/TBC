import { View, Text, useColorScheme, Platform, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { Link, useNavigation, useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const adminPanel = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
      Poppins_500Medium,
      Poppins_700Bold,
      NotoSerif_400Regular,
      NotoSerif_700Bold,
    });

    const colorScheme = useColorScheme();
    const theme = useTheme();
    const isDarkMode = colorScheme === 'dark';


  const Header = () => {
      return (
          <View style={styles.header}>

              <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Ionicons name="arrow-back-outline" size={25} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
                </TouchableOpacity>
              <Text style={styles.headerText}>UPLOAD</Text>
          </View>
          )
  }
  const Card =({
    title,

})=> {
    return(
            <View style={styles.card}>
                <Text style={styles.cardText}>{title}</Text>
            </View>
        )
        };

        const styles = StyleSheet.create({
            container:{
                backgroundColor: theme.colors.background,
                justifyContent:"flex-start"
            },
            containerText: {
                fontFamily: 'NotoSerif_400Regular',
                fontSize: 15,
                padding: 10,
                color: isDarkMode ? "#fff" : Colors.textGrey
            },
            header : {
                top: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 10,
                backgroundColor: theme.colors.background,
            },
            icon: {
                marginRight: 10,
            },
            headerText: {
                alignSelf: 'center',
                fontSize: 15,
                fontFamily: 'NotoSerif_400Regular',
                color: isDarkMode ? "#fff" : Colors.textGrey,
                bottom: 22
            },
            card: {
                height: Platform.OS === 'ios' ? 70 : 70,
                width:'90%',
                backgroundColor: theme.colors.background,
                borderRadius:20,
                flexDirection:'row',
                justifyContent: 'flex-start',
                alignItems:'center',
                marginTop:10,
                alignSelf: 'center',
                shadowOffset:{width:0,height:3},
                shadowOpacity:0.3,
                shadowColor: isDarkMode ? '#fff' : '#000',
                elevation:3,
            },
            cardIcon: {
                marginLeft: 20
            },
            cardText: {
                marginLeft: 20,
                color: isDarkMode ? "#fff" : '#000',
                fontFamily: 'Poppins_500Medium',
                fontSize: 17
            },
        })
  return (
    <SafeAreaView>
        <Header />
          <View style={[styles.container, {top: 10, marginBottom: 50}]}>
            <TouchableOpacity onPress={() => navigation.navigate('admin/sermon')}>
                <Card title='Sermon'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('admin/excerpt')}>
                <Card title='Excerpts'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Card title='Inspirational'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Card title='GOAKS'/>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default adminPanel