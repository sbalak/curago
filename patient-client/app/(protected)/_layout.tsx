import React from "react";
import { Stack } from "expo-router";
import LocationProvider from "@/hooks/useLocation";
import MainHeader from "@/components/headers/MainHeader";

export default function _layout() {
  return (
    <LocationProvider>
      <Stack
        screenOptions={{
          header: () => <MainHeader />, // Apply globally
        }}
      >
        <Stack.Screen
          name="dashboard"
          options={{ headerShown: false, headerTitle: "dashboard" }}
        />
        <Stack.Screen name="settings" />
        <Stack.Screen name="doctor" />
        <Stack.Screen name="booking" />
      </Stack>
    </LocationProvider>
  );
}
