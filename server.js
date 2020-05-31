require("dotenv").config();

const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

app.use(express.json())

const questionsRouter = require("./routes/questions")
app.use("/questions", questionsRouter)

app.listen(3000, () => console.log("Server Started"))

