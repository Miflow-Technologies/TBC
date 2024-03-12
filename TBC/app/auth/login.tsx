import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from '../../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '@/components/Button';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, initializeAuth, } from 'firebase/auth';
import { app, auth } from '@/config/firebaseConfig'; // Import your Firebase configuration
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/Auth';

const Login = () => {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const isDarkMode = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);
  const { isAdmin, setIsAdmin } = useContext(AuthContext);


  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        if (isChecked) {
          auth;
        }

        const db = getFirestore();
        const userDocRef = doc(db, 'Users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          if (userData.isUser == '0') {
            setAuthenticated(true);
            setIsAdmin(true)
            navigation.navigate('admin/adminPanel');
           
          } else {
            setAuthenticated(true);
            navigation.navigate('(tabs)');
          }
        } else {
          console.error('User document does not exist');
          Alert.alert('Failed to log in');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to log in');
    }
  };

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>
            
                    <Text style={{
                        fontSize: 16,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>You have been missed!</Text>
                    

                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor:  isDarkMode ? '#fff' : '#000',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 12
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            onChangeText={text => setEmail(text)}
                            placeholderTextColor={ isDarkMode ? '#fff' : Colors.textGrey}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                                color: isDarkMode ? '#fff' : '#000'
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor:  isDarkMode ? '#fff' : '#000',
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 12
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            onChangeText={text => setPassword(text)}
                            placeholderTextColor={isDarkMode ? '#fff' : Colors.textGrey}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                color: isDarkMode ? '#fff' : '#000'
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={isDarkMode ? '#fff' : '#000'} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? Colors.primary : undefined}
                    />
                    <Text style={{color: isDarkMode ? '#fff' : '#000', }}>Remember Me</Text>
                </View>

                <Button
                    title="Login"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={() => handleLogin()}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: isDarkMode ? '#fff' :  Colors.textGrey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14, color: isDarkMode ? '#fff' : '#000' }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: isDarkMode ? '#fff' :  Colors.textGrey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: isDarkMode ? '#fff' : Colors.textGrey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("@/assets/images/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text style= {{color: isDarkMode ? '#fff' : '#000'}}>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: isDarkMode ? '#fff' : Colors.textGrey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("@/assets/images/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text style = {{color: isDarkMode ? '#fff' : '#000'}}>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: isDarkMode ? '#fff' : '#000' }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("auth/signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: Colors.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login

function getReactNativePersistence(ReactNativeAsyncStorage: any): import("@firebase/auth").Persistence | import("@firebase/auth").Persistence[] | undefined {
    throw new Error('Function not implemented.');
}
