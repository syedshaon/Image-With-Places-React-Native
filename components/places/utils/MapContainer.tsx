import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";

import * as LocationPicker from "expo-location";

import OutlinedButton from "@/components/OutlinedButton";
import MapPreview from "@/components/places/utils/MapPreview";
import Modal from "react-native-modal";
import PickOnMap from "@/components/places/utils/PickOnMap";
const ApiKey = "AIzaSyA8oZf32HLpksUM_wEIGhmFmWCLgEa7ohw";

export interface Location {
  latitude: number;
  longitude: number;
}

type MapContainerProps = {
  location: Location | null;
  setLocation: (location: Location | null) => void;
  address: string;
  setAddress: (address: string) => void;
};

const MapContainer = ({ location, setLocation, address, setAddress }: MapContainerProps) => {
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
  // from location find address with geocoding
  useEffect(() => {
    const getAddress = async () => {
      if (!location) return;
      // find address from google map geocode api
      // const newAddressData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ApiKey}`);
      // const newAddress = await newAddressData.json();
      // console.log("newAddress", newAddress.results[0].formatted_address);

      // Google reverseGeocode and expo reverseGeocodeAsync gives same result
      const addressData = await LocationPicker.reverseGeocodeAsync(location);
      if (addressData && addressData.length > 0 && addressData[0].name) {
        // console.log(addressData[0].formattedAddress);
        const fullAddress = `${addressData[0].formattedAddress}`;
        setAddress(fullAddress);
        // formattedAddress
      } else {
        setAddress("");
      }
    };
    getAddress();
  }, [location]);

  return (
    <>
      <Modal isVisible={showMapModal}>
        <View style={{ flex: 1, height: "100%" }}>
          <PickOnMap mapCenter={mapCenter} imgLocation={location ? { latitude: location.latitude, longitude: location.longitude } : null} setImgLocation={(loc) => setLocation(loc ? { latitude: loc.latitude, longitude: loc.longitude } : null)} setShowMapModal={setShowMapModal} />
        </View>
      </Modal>
      <View style={styles.locationPicker}>
        {location?.longitude && <MapPreview location={location} />}
        {address && (
          <View style={styles.addressDetails}>
            <Text>{address}</Text>
          </View>
        )}
        <View style={styles.locationPickerButtons}>
          <OutlinedButton iconName="location" title="Locate User" onPress={locateLocationHandler} />

          <OutlinedButton iconName="map" title="Pick on Map" onPress={PickLocationHandler} />
        </View>
      </View>
    </>
  );
};

export default MapContainer;

const styles = StyleSheet.create({
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
  addressDetails: {
    marginVertical: 10,
    alignItems: "center",
    width: "100%",
  },
});
