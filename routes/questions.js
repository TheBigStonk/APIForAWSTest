const express = require("express")
const router = express.Router()
const Question = require("../models/question")

// Getting all Questions
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (err){
        res.status(500).json({ message: err.message })  
    }
})
// Getting number of Questions
router.get("/:number",  (req, res) => {
    res.send(req.params.number)
})
// New Question to add
router.post("/",  (req, res) => {

})

module.exports = router