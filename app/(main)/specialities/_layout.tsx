import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          headerTitle: route.params?.headerTitle ?? "Default Title",
          headerTitleStyle: {
            fontFamily: "outfit-bold",
            fontSize: 20,
          },
        };
      }}
    >
      <Stack.Screen name="index" />{" "}
    </Stack>
  );
}
