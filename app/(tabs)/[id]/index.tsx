import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as SQLite from "expo-sqlite"; 
import MapView, { Marker } from "react-native-maps";

type ParamList = {
  Detail: { id: string }; // Specify the expected params
};

const index = () => {
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState<any[]>([]);
  // Use `useRoute` to get the current route and its params
  const route = useRoute<RouteProp<ParamList, "Detail">>();
  // console.log(route.params);

  // Get the `id` from route params
  const { id } = route.params;
  // find id from params

  useEffect(() => {
    const fetchData = async () => {
      // console.log("id", id);
      // id [0e4ec327-e5ed-4258-a293-afdc9d992901]

      const nId = id.replace("[", "").replace("]", "");
      // console.log("nId", nId);
      // Fetch the place info using the `id`
      const db = await SQLite.openDatabaseAsync("placesDB");
      const result = await db.getAllAsync("SELECT * FROM places WHERE id = ?", [nId]);
      // console.log("result", result);
      // result [{"address": "9MVJ+336, Faridpur - Boalmari Rd, Boalmari, Bangladesh", "id": "0e4ec327-e5ed-4258-a293-afdc9d992901", "imageURL": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252F06-native-4e414409-7653-45a6-9afd-68fa2b3de069/ImagePicker/ff21fcff-2865-4439-8e6e-02eae51131bf.jpeg", "latitude": 23.3925254, "longitude": 89.6801798, "title": "Hok"}]
      setPlace(result);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingOverlay message="Fetching Place Info" />
      ) : (
        <View style={Styles.imgContainer}>
          <Text style={Styles.imgTitle}>{place[0].title}</Text>

          <Image source={{ uri: place[0].imageURL }} style={Styles.img} />

          <Text style={Styles.imgTitle}>Location of the Image</Text>
          <MapView style={Styles.map} initialRegion={{ latitude: place[0].latitude, longitude: place[0].longitude, latitudeDelta: 0.0922,
          longitudeDelta: 0.0421, }} >
            <Marker   coordinate={{latitude: place[0].latitude, longitude: place[0].longitude,  }} title="Image Location"   />
          </MapView>
          <Text style={Styles.imgAddress}>{place[0].address}</Text>
        </View>
      )}
    </>
  );
};

export default index;

const Styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#e4d2d2",

    alignItems: "center",
  },
  imgTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  img: {
    width: 400,
    maxWidth: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  imgAddress: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  map: {
    width: 400,
    maxWidth: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
});
