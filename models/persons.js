const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_DATABASE_URI;

mongoose.connect(url);

console.log("Connecting to", url);
