import * as SQLite from "expo-sqlite";

// export const createTable = async () => {
//   const db = await SQLite.openDatabaseAsync("places.db");
//   await db.execAsync(`
//     CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURL TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);
//   `);
// };

export const createTable = async () => {
  const db = await SQLite.openDatabaseAsync("placesDB");
  await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
INSERT INTO test (value, intValue) VALUES ('test1', 123);
INSERT INTO test (value, intValue) VALUES ('test2', 456);
INSERT INTO test (value, intValue) VALUES ('test3', 789);
`);
};

export const insertValue = async () => {
  const db = await SQLite.openDatabaseAsync("placesDB");
  const result = await db.runAsync("INSERT INTO test (value, intValue) VALUES (?, ?)", "aaa", 100);
  return result;
};

// export const insertValue = async (id: string, title: string, imageURL: string, address: string, latitude: number, longitude: number) => {
//   const db = await SQLite.openDatabaseAsync("places.db");
//   const result = await db.runAsync(
//     `
//   INSERT INTO places (id, title, imageURL, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)
//   `,
//     ["id", "title", "imageURL", "address", 123, 124]
//   );
//   return result;
// };

// export const fetchValues = async () => {
//   const db = await SQLite.openDatabaseAsync("places.db");
//   const result = await db.execAsync(`
//     SELECT * FROM places;
//   `);
//   return result;
// };

export const fetchValues = async () => {
  const db = await SQLite.openDatabaseAsync("placesDB");
  const result = await db.getAllAsync("SELECT * FROM places");
  return result;
};
