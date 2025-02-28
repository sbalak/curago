import React from "react";
import { Stack, Tabs } from "expo-router";
import MainHeader from "@/components/headers/MainHeader";
import { FontAwesome5 } from "@expo/vector-icons"; // For tab icons

export default function _layout() {
  return (
    <>
      <Stack
        screenOptions={({ route }) => ({
          headerTitle: route.params?.headerTitle,
        })}
      >
        <Stack.Screen name="index" options={{ header: () => <MainHeader /> }} />
      </Stack>
    </>
  );
}
