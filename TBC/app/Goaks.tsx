import { View, Text, Platform } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomHeader'

const Goaks = () => {
  return (
    <View style={{top: Platform.OS === 'ios' ? -10 : -50}}>
      <CustomHeader name={'Listen'} />
    <Text>Excerpt</Text>
  </View>
  )
}

export default Goaks