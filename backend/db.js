
var mongoose = require("mongoose");
const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); 
  }
};

module.exports = connectMongoDB;
