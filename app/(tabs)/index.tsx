import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Link } from "expo-router";

const AllPlaces = () => {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<any[]>([]);

   useEffect(() => {
    const asyncF = async () => {
      const db = await SQLite.openDatabaseAsync("placesDB");
      const result = await db.execAsync(`
          CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURL TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);
        `);
      // console.log("Result ", result);
      // const result2 = await db.runAsync(
      //   `
      // INSERT INTO places (id, title, imageURL, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)
      // `,
      //   ["id", "title", "imageURL", "address", 123, 124]
      // );
      // console.log("Insert Value ", result2);
    const result3 = await db.getAllAsync("SELECT * FROM places");
      // console.log("Fetch Values ", result3);
    };
    asyncF();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
       setLoading(true);
       try {
         const db = await SQLite.openDatabaseAsync("placesDB");
      const result = await db.getAllAsync("SELECT * FROM places");
      // console.log(result);
      setPlaces(result);
       } catch (error) {
         console.log(error);
        
       }
     
      setLoading(false);
    };

     fetchData();
  }, []);
  return (
    <View style={Styles.rootContainer}>
      {loading && <LoadingOverlay message="Loading Places..." />}

      {!loading && (
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
          ListEmptyComponent={() => (
            <View style={Styles.rootContainer}><Text style={{ textAlign: "center" }}>No places found</Text></View>
          )
          }
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
