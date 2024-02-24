const mongoose = require("mongoose");

let connectToDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const connect = await mongoose.connect(uri);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectToDatabase;
 