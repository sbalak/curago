import React from "react";
import { Stack } from "expo-router";
import MainHeader from "@/components/headers/MainHeader";

export default function _layout() {
  return (
    <Stack 
      screenOptions={({ route }) => ({
        headerTitle: route.params?.headerTitle
      })} 
    >
      <Stack.Screen name="index"  options={{ header: () => <MainHeader /> }} />
    </Stack>
  );
}
