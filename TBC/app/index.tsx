import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navbar from '@/components/Navbar'
import RootLayout from './_layout'

const HomeScreen = () => {
  return (
    <><RootLayout /><Navbar /></>

  )
}

export default HomeScreen