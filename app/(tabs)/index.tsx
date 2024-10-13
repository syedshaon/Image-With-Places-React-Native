import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Link } from "expo-router";

const AllPlaces = () => {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = await SQLite.openDatabaseAsync("placesDB");
      const result = await db.getAllAsync("SELECT * FROM places");
      setPlaces(result);
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <View style={Styles.rootContainer}>
      {loading && <LoadingOverlay message="Loading Places..." />}

      {!loading && places.length && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/${item.id}`} style={Styles.linkContainer}>
              <View style={Styles.imgContainer}>
                <Text style={Styles.imgTitle}>{item.title}</Text>

                <Image source={{ uri: item.imageURL }} style={Styles.img} />
                <Text style={Styles.imgAddress}>{item.address}</Text>
              </View>
            </Link>
          )}
        />
      )}
    </View>
  );
};

export default AllPlaces;

const Styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  linkContainer: {
    flex: 1,
    marginBottom: 20,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#e4d2d2",
    // width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "center",
  },
  imgContainer: {
    flex: 1,
    // backgroundColor: "#6b5e5e",

    // width: "100%",
  },
  imgTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  img: {
    width: 400,
    maxWidth: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  imgAddress: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
});
