import React, { useState, useEffect } from "react";
import { View, TextInput, Image, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

import CoolButton from "@/components/CoolButton";

import MapContainer from "@/components/places/utils/MapContainer";
import uuid from "react-native-uuid";
import { Place } from "@/model/place";

import * as SQLite from "expo-sqlite";
import { createTable, fetchValues, insertValue } from "@/model/database";

export interface Location {
  latitude: number;
  longitude: number;
}

const AddPlace = () => {
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
  const submitHandler = async () => {
    if (!title || !image || !address || !location) {
      Alert.alert("Missing Fields", "Please fill in all the fields.");
      return;
    }

    const newPlace = new Place(uuid.v4().toString(), title, image, address, location);
    const db = await SQLite.openDatabaseAsync("placesDB");

    const result = await db.runAsync(
      `
      INSERT INTO places (id, title, imageURL, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)
      `,
      [uuid.v4().toString(), title, image, address, location.latitude, location.longitude]
    );
    console.log("Insert Value ", result);

    // You can send `newPlace` to your backend or state management system here

    // Reset the form
    setTitle("");
    setImage(null);
    setAddress("");
    setLocation(null);
  };

  useEffect(() => {
    const asyncF = async () => {
      const db = await SQLite.openDatabaseAsync("placesDB");
      // const result = await db.execAsync(`
      //     CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURL TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);
      //   `);
      // console.log("Result ", result);
      // const result = await db.runAsync(
      //   `
      // INSERT INTO places (id, title, imageURL, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)
      // `,
      //   ["id", "title", "imageURL", "address", 123, 124]
      // );
      // console.log("Insert Value ", result);
      // const result = await db.getAllAsync("SELECT * FROM places");
      // console.log("Fetch Values ", result);
    };
    asyncF();
  }, []);

  return (
    <ScrollView contentContainerStyle={Styles.rootContainer}>
      <View style={Styles.form}>
        {/* Title Input */}
        <TextInput style={Styles.input} placeholder="Title" value={title} onChangeText={setTitle} />

        {/* Image Picker */}
        <View style={Styles.imagePicker}>
          <CoolButton title="Pick Image" onPress={pickImageHandler} />
          {image && <Image source={{ uri: image }} style={Styles.image} />}
        </View>

        {/* Location Picker */}
        <MapContainer address={address} setAddress={setAddress} location={location} setLocation={setLocation} />
        {/* Submit Button */}
        <CoolButton variation="secondary" title="Add Place" onPress={submitHandler} />
      </View>
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
