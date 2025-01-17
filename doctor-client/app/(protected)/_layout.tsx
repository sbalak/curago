import React from 'react'
import { Stack } from 'expo-router'
import LocationProvider from '@/hooks/useLocation'

export default function _layout() {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </LocationProvider>
  )
}