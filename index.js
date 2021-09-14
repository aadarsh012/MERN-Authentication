require("dotenv").config({ path: "./config.env" });

const express = require("express");

const connectDB = require("./config/db");

const errorHandler = require("./middleware/error");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware(Placed at the last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
