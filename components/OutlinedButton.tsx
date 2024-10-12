import React, { ComponentProps } from "react";
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface OutlinedButtonProps {
  title: string;
  onPress: () => void;
  iconName: ComponentProps<typeof Ionicons>["name"]; // Type for the icon name
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconPosition?: "left" | "right";
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ title, onPress, iconName, iconSize = 24, iconColor = "#000", style, textStyle, iconPosition = "left" }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {iconPosition === "left" && <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.icon} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {iconPosition === "right" && <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.icon} />}
    </TouchableOpacity>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    // width: "100%",
    borderWidth: 1,
    borderColor: "#fff", // Outlined effect
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginHorizontal: 8,
  },
});
