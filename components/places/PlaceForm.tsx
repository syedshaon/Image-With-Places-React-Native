import { Place } from "@/model/place";

import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as LocationPicker from "expo-location";

import CoolButton from "@/components/CoolButton";
import OutlinedButton from "@/components/OutlinedButton";
import MapPreview from "@/components/MapPreview";
import Modal from "react-native-modal";
import PickOnMap from "@/components/PickOnMap";

export interface Location {
  latitude: number;
  longitude: number;
}

const AddPlaceForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<Location | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);

  const [mapCenter, setMapCenter] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getCenterOfMap = async () => {
      if (location?.latitude && location?.longitude) {
        // setCenterOfMap({
        //   lat: imgLocation.latitude,
        //   lng: imgLocation.longitude,
        // });
        setMapCenter({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        return;
      } else {
        const { status } = await LocationPicker.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "You need to grant location permissions to use this app.");
          return;
        }

        const location = await LocationPicker.getCurrentPositionAsync();
        // setCenterOfMap({
        //   lat: location.coords.latitude,
        //   lng: location.coords.longitude,
        // });
        setMapCenter({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };
    getCenterOfMap();
  }, []);

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

  // Function to locate the user
  const locateLocationHandler = async () => {
    const { status } = await LocationPicker.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "You need to grant location permissions to use this app.");
      return;
    }

    const location = await LocationPicker.getCurrentPositionAsync();
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const PickLocationHandler = async () => {
    setShowMapModal(true);
  };

  // Submit handler for the form
  const submitHandler = () => {
    if (!title || !image || !address || !location) {
      Alert.alert("Missing Fields", "Please fill in all the fields.");
      return;
    }

    const newPlace = {
      id: new Date().toString(), // Placeholder for now
      title,
      imageURL: image,
      address,
      location,
    };

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

      {/* Address Input */}
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

      {/* Location Picker */}
      <Modal isVisible={showMapModal}>
        <View style={{ flex: 1, height: "100%" }}>
          <PickOnMap mapCenter={mapCenter} imgLocation={location ? { latitude: location.latitude, longitude: location.longitude } : null} setImgLocation={(loc) => setLocation(loc ? { latitude: loc.latitude, longitude: loc.longitude } : null)} setShowMapModal={setShowMapModal} />
        </View>
      </Modal>
      <View style={styles.locationPicker}>
        {location?.longitude && <MapPreview location={location} />}
        <View style={styles.locationPickerButtons}>
          <OutlinedButton iconName="location" title="Locate User" onPress={locateLocationHandler} />

          <OutlinedButton iconName="map" title="Pick on Map" onPress={PickLocationHandler} />
        </View>
      </View>

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
