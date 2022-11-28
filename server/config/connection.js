const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.DB_STRING || "mongodb://127.0.0.1:27017/p2pDB" || "mongodb://localhost/p2pDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;