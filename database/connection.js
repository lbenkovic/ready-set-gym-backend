import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.CONNECTION_STRING);
let conn = null;

try {
    console.log("Establishing connection.");
    conn = await client.connect();
} catch (e) {
    console.error(e);
}
let db = conn.db(process.env.DATABASE);

export { client, db };
