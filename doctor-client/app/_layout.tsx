import AuthProvider, { useAuth } from "@/hooks/useAuth";
import { router, Slot } from "expo-router";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  let [fontsLoaded] = useFonts({
    'open-sans': require('./../assets/fonts/OpenSans.ttf'),
    'playfair': require('./../assets/fonts/PlayfairDisplay.ttf'),
    'spline-sans': require('./../assets/fonts/SplineSans.ttf')
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const RootLayout = () => {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState.authenticated === null) {
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}><Text>Loading Now...</Text></View>
    }
    else {
      if (authState.authenticated) {
        router.replace('/dashboard'); 
      }
      else {
        router.replace('/login');
      }
    }
  }, [authState.authenticated]);

  return (
    <Slot />
  );
}