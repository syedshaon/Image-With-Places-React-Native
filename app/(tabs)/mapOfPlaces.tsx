import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Alert, RefreshControl, ScrollView } from "react-native";
import * as LocationPicker from "expo-location";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as SQLite from "expo-sqlite";

export default function mapOfPlaces() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const db = await SQLite.openDatabaseAsync("placesDB");
    const result = await db.getAllAsync("SELECT * FROM places");
    setPlaces(result);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
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
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 6,
        longitudeDelta: 6,
      });
      const db = await SQLite.openDatabaseAsync("placesDB");
      const result = await db.getAllAsync("SELECT * FROM places");
      setPlaces(result);
      // console.log("Places", result);
      setLoading(false);
    };
    fetchLocation();
  }, []);

  return (
    <View style={Styles.rootContainer}>
      {loading ? (
        <LoadingOverlay message="Fetching Map Data" />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={Styles.scrollView}>
          <MapView initialRegion={region} style={Styles.map}>
            {places.map((marker, index) => (
              <Marker key={index} coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }} title={marker.title} description={marker.description} />
            ))}
          </MapView>
        </ScrollView>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    // backgroundColor: "#201c1c",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "#fc1818",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "50%",
  },
});
