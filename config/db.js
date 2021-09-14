const mongoose = require("mongoose");

const connectDB = async function () {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MongoDb Connected");
};

module.exports = connectDB;
