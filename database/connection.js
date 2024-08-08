import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

// const userName = process.env.USER_NAME;
// const userPassword = process.env.USER_PASSWORD;
// const connectionString = process.env.CONNECTION_STRING;
// const database = process.env.DATABASE;
// console.log(connectionString);
// console.log(database);
const client = new MongoClient(process.env.CONNECTION_STRING);
let conn = null;

try {
    console.log("Establishing connection.");
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db(process.env.DATABASE);

export default db;
