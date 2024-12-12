const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://saibhagat2004:<db_password>@practivedb.fvkdn.mongodb.net/?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error("Connection error:", err));
