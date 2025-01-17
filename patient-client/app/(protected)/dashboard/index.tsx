import { SafeAreaView, ScrollView, Text } from 'react-native'
import React from 'react'
import { common } from '@/constants/Styles';

export default function dashboard() {  
  return (
    <SafeAreaView style={common.safeArea}>
      <ScrollView style={common.container}>
        <Text>Landed</Text>
      </ScrollView>
    </SafeAreaView>
  )
}