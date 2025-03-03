import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import MainHeader from "@/components/headers/MainHeader";
import { FiltersProvider } from "@/context/FiltersContext";

const TabRoot = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "dashboard") iconName = "home";
          else if (route.name === "profile") iconName = "user";
          else if (route.name === "settings") iconName = "user";
          else if (route.name === "doctor") iconName = "stethoscope";
          return <FontAwesome5 name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: "#ff6347", // Tomato red for active tab
        tabBarInactiveTintColor: "#7a7a7a", // Gray for inactive tab
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65,
          paddingTop: 5,
          paddingBottom: 10,
          borderTopColor: "lightgray",
          borderTopWidth: 1,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          elevation: 5, // Adds shadow for Android
          shadowColor: "#000", // iOS shadow
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="doctor"
        options={{
          title: "Doctors",
          header: () => <MainHeader />,
          href: "/doctor",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Profile",
          header: () => <MainHeader />,
        }}
      />
    </Tabs>
  );
};

export default TabRoot;
