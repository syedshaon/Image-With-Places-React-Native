import { Tabs } from "expo-router";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation(); // Access the navigation object

  // Function to go back to the previous page
  const goToPreviousPage = () => {
    navigation.goBack(); // Go back to the previous screen
  };

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
        name="mapOfPlaces"
        options={{
          title: "Map of Places",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "globe" : "globe-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="[id]/index"
        options={{
          title: "Place Details",
          href: null,
          headerLeft: () => (
            <Pressable onPress={goToPreviousPage}>
              <Ionicons name="arrow-back" style={{ marginLeft: 20 }} size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
