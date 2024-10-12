import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

// https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
// &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
// &markers=color:red%7Clabel:C%7C40.718217,-73.998284
// &key=AIzaSyA8oZf32HLpksUM_wEIGhmFmWCLgEa7ohw&signature=YOUR_SIGNATURE

type MapPreviewProps = {
  location: { latitude: number; longitude: number };
};
const ApiKey = "AIzaSyA8oZf32HLpksUM_wEIGhmFmWCLgEa7ohw";
const MapPreview = ({ location }: MapPreviewProps) => {
  // const location = { latitude: 37.78825, longitude: -122.4324 };
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7C${location.latitude},${location.longitude}&key=${ApiKey}`;
  return <Image source={{ uri: mapPreviewUrl }} style={styles.image} />;
};

export default MapPreview;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
