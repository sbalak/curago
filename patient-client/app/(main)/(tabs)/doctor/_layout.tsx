import React from "react";
import { Stack } from "expo-router";
import CommonHeader from "@/components/headers/CommonHeader";
import { FiltersProvider } from "../../../../context/FiltersContext";

export default function _layout() {
  return (
    // <FiltersProvider>
    <Stack>
      <Stack.Screen
        name="filter"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          // header: (props) => <CommonHeader props={props} {...props} />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          // header: (props) => <CommonHeader props={props} {...props} />,
        }}
      />
    </Stack>
    // </FiltersProvider>
  );
}
