import React from "react";
import { Stack } from "expo-router";
import CommonHeader from "@/components/headers/CommonHeader";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
