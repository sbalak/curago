import React from "react";
import { Stack } from "expo-router";
import DashboardHeader from "@/components/headers/DashboardHeader";

// export default function _layout() {
//   return (
//     <Stack
//       screenOptions={({ route }) => ({
//         console.log('Header Title:', route.params?.headerTitle);
//         headerTitle: route.params?.headerTitle ?? 'Default Title',
//         headerTitleStyle: {
//           fontFamily: 'outfit-bold',
//           fontSize: 20
//         }
//       })}
//     >
//       <Stack.Screen name="index" options={{ header: () => <DashboardHeader /> }} />
//     </Stack>
//   )
// }

export default function _layout() {
  return (
    <Stack
      screenOptions={({ route }) => {
        console.log("Header Title:", route.params?.headerTitle);

        return {
          headerTitle: route.params?.headerTitle ?? "Default Title",
          headerTitleStyle: {
            fontFamily: "outfit-bold",
            fontSize: 20,
          },
        };
      }}
    >
      <Stack.Screen
        name="index"
        options={{ header: () => <DashboardHeader /> }}
      />
    </Stack>
  );
}
