const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const mongoURI = process.env.MONGO_URL.toString();

const connectToMongo = async () =>{
    await mongoose.connect(mongoURI);
    console.log("Connected to the mongo database");
}

module.exports = connectToMongo;