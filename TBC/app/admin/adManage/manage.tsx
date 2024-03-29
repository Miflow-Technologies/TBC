import { View, Text, useColorScheme, Platform, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Pressable, Animated } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { NotoSerif_400Regular, NotoSerif_700Bold } from '@expo-google-fonts/noto-serif';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from '@/components/Header';

const manage = () => {
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


    const Card = ({ title, route }) => {
        const scaleValue = new Animated.Value(1);
    
        const handlePressIn = () => {
          Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
          }).start();
        };
    
        const handlePressOut = () => {
          Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        };
    
        const animatedStyle = {
          transform: [{ scale: scaleValue }],
        };
    
        return (
          <Pressable onPress={route} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={[styles.card, animatedStyle]}>
              <Text style={styles.cardText}>{title}</Text>
            </Animated.View>
          </Pressable>
        );
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
            cardText: {
                marginLeft: 20,
                color: isDarkMode ? "#fff" : '#000',
                fontFamily: 'Poppins_500Medium',
                fontSize: 17
            },
        })
  return (
    <SafeAreaView>
        <Header heading='MANAGE' />
          <ScrollView>
          <View style={[styles.container, {top: 10, marginBottom: 50}]}>
            
        
                <Card title='Excerpts' route={() => navigation.navigate('admin/adManage/excerpt')}/>
                
    
                <Card title='Audio Sermon' route={() => navigation.navigate('admin/adManage/audioSermon')}/>
            
                <Card title='Goaks' route={() => navigation.navigate('admin/adManage/goaks')}/>
            
                <Card title='Devotional' route={() => navigation.navigate('admin/adManage/devotional')}/>

                <Card title='Articles' route={() => navigation.navigate('admin/adManage/articles')}/>
            
                <Card title='Daily Quote' route={() => navigation.navigate('admin/adManage/quote')}/>
            
                <Card title='Announcements' route={() => navigation.navigate('admin/adManage/announcement')}/>
            </View>
          </ScrollView>

    </SafeAreaView>
  )
}

export default manage