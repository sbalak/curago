import React from 'react'
import { Stack } from 'expo-router'
import DashboardHeader from '@/components/headers/DashboardHeader'

export default function _layout() {
  return (
    <Stack 
      screenOptions={({ route }) => ({
        headerTitle: route.params.headerTitle,
        headerTitleStyle: {
          fontFamily: 'outfit-bold',
          fontSize: 20
        } 
      })} 
    >
      <Stack.Screen name="index" options={{ header: () => <DashboardHeader /> }} />
    </Stack>
  )
}