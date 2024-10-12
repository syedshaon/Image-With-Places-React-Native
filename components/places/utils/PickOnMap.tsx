import React from "react";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { StyleSheet, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CoolButton from "../../CoolButton";

type PickOnMapProps = {
  setShowMapModal: (show: boolean) => void;
  imgLocation: { latitude: number; longitude: number } | null;
  setImgLocation: (location: { latitude: number; longitude: number } | null) => void;
  mapCenter: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
};

export default function PickOnMap({ mapCenter, setShowMapModal, imgLocation, setImgLocation }: PickOnMapProps) {
  const selectLocationHandler = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setImgLocation({ latitude, longitude });
  };

  const confirmLocation = () => {
    if (!imgLocation) {
      Alert.alert("No location selected", "Please select a location on the map to continue.");
      return;
    }
    setShowMapModal(false); // Close modal when location is confirmed
  };

  const closeModal = () => {
    if (!imgLocation) {
      Alert.alert(
        "Are you sure?", // Title
        "Are you sure you want to close without picking a location?", // Message
        [
          { text: "No", style: "cancel" }, // Cancel option
          { text: "Yes", onPress: () => setShowMapModal(false) }, // Confirm option
        ],
        { cancelable: true }
      );
    } else {
      setShowMapModal(false);
    }
  };

  return (
    <View style={Styles.rootContainer}>
      <Ionicons name="close" size={24} color="#fff" style={Styles.closeIcon} onPress={closeModal} />
      <MapView
        region={mapCenter} // Use 'region' to dynamically update the map's center
        style={Styles.map}
        onPress={selectLocationHandler}
      >
        {imgLocation && <Marker coordinate={imgLocation} title="Picked Location" description={`Lat: ${imgLocation.latitude}, Lng: ${imgLocation.longitude}`} />}
      </MapView>
      <CoolButton variation="secondary" title="Set Location" onPress={confirmLocation} />
    </View>
  );
}

const Styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "80%",
    marginBottom: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(233, 22, 22, 0.88)",
    textAlign: "center",
    textAlignVertical: "center",
  },
  cancel: {
    color: "red",
  },
});
