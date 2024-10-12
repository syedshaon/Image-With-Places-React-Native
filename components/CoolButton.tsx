import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variation?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CoolButton: React.FC<ButtonProps> = ({ title, onPress, variation = "primary", style, textStyle }) => {
  const isPrimary = variation === "primary";
  return (
    <TouchableOpacity style={[styles.button, isPrimary ? styles.primary : styles.secondary, style]} onPress={onPress}>
      <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CoolButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primary: {
    backgroundColor: "#6c757d",
  },
  secondary: {
    backgroundColor: "#007bff",
  },
  text: {
    fontSize: 16,
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#ffffff",
  },
});
