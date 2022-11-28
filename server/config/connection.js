const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.DB_STRING || 'mongodb+srv://glitch0320:JNUdRPNtIpYuysix@p2pdb.p6gztcz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;