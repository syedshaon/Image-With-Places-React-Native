import { View, Text, StyleSheet } from "react-native";
import React from "react";

const AllPlaces = () => {
  return (
    <View style={Styles.rootContainer}>
      <Text>AllPlaces</Text>
    </View>
  );
};

export default AllPlaces;

const Styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
