import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />,
        }}
      />

      <Tabs.Screen
        name="addplace"
        options={{
          title: "Add Place",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "add-circle" : "add-circle-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map of Places",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "globe" : "globe-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
