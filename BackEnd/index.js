require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const mongoString = process.env.DATABASE_URL;// MongoDB connection string
app.use("/api", routes);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", async () => {
  console.log("Database Connected");
});

app.listen(3002, () => {
  console.log(`Server Started at ${3000}`);
});
