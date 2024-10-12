import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import CoolButton from "@/components/CoolButton";

import MapContainer from "./utils/MapContainer";
import uuid from "react-native-uuid";
import { Place } from "@/model/place";

export interface Location {
  latitude: number;
  longitude: number;
}

const AddPlaceForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<Location | null>(null);

  // Function to handle Image Picker
  const pickImageHandler = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "You need to grant camera permissions to use this app.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  // Submit handler for the form
  const submitHandler = () => {
    if (!title || !image || !address || !location) {
      Alert.alert("Missing Fields", "Please fill in all the fields.");
      return;
    }

    const newPlace = new Place(uuid.v4().toString(), title, image, address, location);

    // You can send `newPlace` to your backend or state management system here
    console.log(newPlace);

    // Reset the form
    setTitle("");
    setImage(null);
    setAddress("");
    setLocation(null);
  };

  return (
    <View style={styles.form}>
      {/* Title Input */}
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />

      {/* Image Picker */}
      <View style={styles.imagePicker}>
        <CoolButton title="Pick Image" onPress={pickImageHandler} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      {/* Location Picker */}
      <MapContainer address={address} setAddress={setAddress} location={location} setLocation={setLocation} />
      {/* Submit Button */}
      <CoolButton variation="secondary" title="Add Place" onPress={submitHandler} />
    </View>
  );
};

export default AddPlaceForm;

const styles = StyleSheet.create({
  form: {
    margin: 10,
    backgroundColor: "#ecd7d7",

    padding: 20,
    borderRadius: 10,
    width: 400,
    maxWidth: "100%",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "#312f2f",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: "100%",
  },
  imagePicker: {
    marginVertical: 10,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  locationPicker: {
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  locationPickerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "100%",
    marginTop: 10,
    // gap: 10,
  },
  locationText: {
    marginTop: 10,
    color: "gray",
  },
});
