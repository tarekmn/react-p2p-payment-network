const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/p2pDB" || "mongodb://localhost/p2pDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;