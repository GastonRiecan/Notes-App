import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://localhost/databasetest";
console.log(URI);



mongoose.connect(URI, {});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
