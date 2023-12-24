import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/CustomHeader'
import * as Haptics from 'expo-haptics';

const ArticleScreen = () => {
  return (
    <View>
      <CustomHeader name='Article'/>
    </View>
  )
}

export default ArticleScreen