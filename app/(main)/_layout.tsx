import { Stack } from "expo-router";
import React from "react";
import LocationProvider from "@/hooks/useLocation";
import { FiltersProvider } from "@/context/FiltersContext";

const RootLayout = () => {
  return (
    <LocationProvider>
      <FiltersProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="booking" options={{ headerShown: false }} />
          <Stack.Screen name="specialities" options={{ headerShown: false }} />
          <Stack.Screen name="symptoms" options={{ headerShown: false }} />
        </Stack>
      </FiltersProvider>
    </LocationProvider>
  );
};

export default RootLayout;
