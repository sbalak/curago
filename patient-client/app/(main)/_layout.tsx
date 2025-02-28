import { Stack } from "expo-router";
import React from "react";
import LocationProvider from "@/hooks/useLocation";

const RootLayout = () => {
  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="settings" options={{ headerShown: false }} /> */}
        <Stack.Screen name="doctor" options={{ headerShown: false }} />
        <Stack.Screen name="booking" options={{ headerShown: false }} />
      </Stack>
    </LocationProvider>
  );
};
