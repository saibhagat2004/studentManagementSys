
var mongoose = require("mongoose");
const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saibhagat2004:0UM5Wtqq7gQQlPsS@practivedb.fvkdn.mongodb.net/studentMg?retryWrites=true&w=majority",
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); 
  }
};

module.exports = connectMongoDB;
