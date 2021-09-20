const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = connectDB;
