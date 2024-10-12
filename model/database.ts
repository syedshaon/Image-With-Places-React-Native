import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("places.db");

export async function initDB() {
  await db.execAsync(`CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageURL TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL`);
}
