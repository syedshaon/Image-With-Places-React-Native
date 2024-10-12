import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Place } from "@/model/place";
import PlaceItem from "./PlaceItem";

// PlaceList will have a porp places of type Place[]

const PlaceList = ({ places }: { places: Place[] }) => {
  function onItemPress() {
    console.log("Item Pressed");
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No places found, maybe start adding some!</Text>
      </View>
    );
  }

  return <FlatList data={places} keyExtractor={(item) => item.id} renderItem={(itemData) => <PlaceItem onItemPress={onItemPress} place={itemData.item} />} />;
};

export default PlaceList;

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
  },
});
