require("dotenv").config();

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(express.json())

const questionsRouter = require("./routes/questions")
app.use("/questions", questionsRouter)

app.listen(3000, () => console.log("Server Started"))

