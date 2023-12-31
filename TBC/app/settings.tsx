import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const settings = () => {
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

                <Link href={'/(tabs)'}>
                    <Ionicons name="arrow-back-outline" size={25} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
                </Link>
                <Text style={styles.headerText}>SETTINGS</Text>
            </View>
            )
    }
    const Card =({
        icon,
        title,

    })=> {
        return(
                <View style={styles.card}>
                    <Ionicons name={icon} size={24} color={isDarkMode ? "#fff" : "#000"} style={styles.cardIcon}/>
                    <Text style={styles.cardText}>{title}</Text>
                </View>
            )
            };

            const styles = StyleSheet.create({
                container:{
                    flex:1,
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
        <ScrollView style={{top: 10, marginBottom: 50}}>
            <View style={styles.container}>

                <Text style={styles.containerText}>Personal Settings</Text>

                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='Dark Mode' icon='moon-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='Invite Friends and Family' icon='people-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='Notifications' icon='ios-notifications-outline'/>
                </TouchableOpacity>

                <Text style={styles.containerText}>About</Text>

                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='About The Developers' icon='code-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='Privacy and Policy' icon='shield-checkmark-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='Terms and Conditions' icon='newspaper-outline'/>
                </TouchableOpacity>

                <Text style={styles.containerText}>Get in Touch</Text>

                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='Give Feedback' icon='chatbox-ellipses-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('(modal)/filter')}>
                    <Card title='Get Support' icon='send-outline'/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.containerText, {alignSelf: 'center', marginTop: 10}]}>VERSION 1.0.0</Text>
        </ScrollView>
  
    </SafeAreaView>
  )
}




export default settings