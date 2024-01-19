import { View, Text, useColorScheme, Platform, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { Link, useNavigation, useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from '@/components/Header';

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
                flexDirection: 'column'
            },
            containerText: {
                fontFamily: 'NotoSerif_400Regular',
                fontSize: 15,
                padding: 10,
                color: isDarkMode ? "#fff" : Colors.textGrey
            },
            header : {
                top: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 10,
                backgroundColor: theme.colors.background,
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
                marginVertical:10,
                alignSelf: 'center',
                shadowOffset:{width:0,height:3},
                shadowOpacity:0.3,
                shadowColor: isDarkMode ? '#fff' : '#000',
                elevation:3,
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
        <Header heading='ADMIN PANEL' />
          <View style={[styles.container,]}>
            <TouchableOpacity onPress={() => navigation.navigate('admin/upload')}>
                <Card title='Upload'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('admin/manage/sermon')}>
                <Card title='Manage'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('admin/announcement')}>
                <Card title='Announcement'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('admin/daily-quotes')}>
                <Card title='Daily Quotes'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('admin/devotional')}>
                <Card title='Devotional'/>
            </TouchableOpacity>
           
          </View>
    </SafeAreaView>
  )
}

export default adminPanel