const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const mongoURI = "mongodb+srv://joy:joy00004@cluster.ywai3il.mongodb.net/test?retryWrites=true&w=majority";

const connectToMongo = async () =>{
    await mongoose.connect(mongoURI);
    console.log("Connected to the mongo database");
}

module.exports = connectToMongo;