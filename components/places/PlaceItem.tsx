import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Place } from "@/model/place";

// export class Place {
//   constructor(public id: string, public title: string, public imageURL: string, public address: string, public location: Location) {}
// }

type PlaceItemProps = {
  place: Place;
  onItemPress: () => void;
};

const PlaceItem = ({ place, onItemPress }: PlaceItemProps) => {
  return (
    // show place related data with styling
    <Pressable onPress={onItemPress} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: place.imageURL }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});
