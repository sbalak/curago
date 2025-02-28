import React from "react";
import { Stack } from "expo-router";
import CommonHeader from "@/components/headers/CommonHeader";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          // header: (props) => <CommonHeader props={props} {...props} />,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          // header: (props) => <CommonHeader props={props} {...props} />,
        }}
      />
    </Stack>
  );
}
