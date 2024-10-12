import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import AddPlaceForm from "@/components/places/PlaceForm";

const AddPlace = () => {
  return (
    <ScrollView contentContainerStyle={Styles.rootContainer}>
      <AddPlaceForm />
    </ScrollView>
  );
};

export default AddPlace;

const Styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
  },
});
