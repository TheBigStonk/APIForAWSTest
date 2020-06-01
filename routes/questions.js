const express = require("express")
const router = express.Router()
const Question = require("../models/question")

// Getting all Questions
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (error){
        res.status(500).json({ message: error.message })  
    }
})
// Getting number of Questions
router.get("/:number", async (req, res) => {
    const numberOfQuestions = req.params.number;
    try { 
        // Start by pulling all questions. There is a better way to do this... too bad!
        const questions = await Question.find()

        // Check if horrible user asked for more questions than there is
        if (req.params.number > questions.length){
            res.status(400).json({message: "You can't ask for more questions than the database itself"})
        }

        /** Create an array of returned questions from the constant questions pulled by
         *  Glorious MongoDB and random sorted with Math Library 
        */
        var returnedQuestions = questions.sort(function (a, b) { return 0.5 - Math.random() })
        returnedQuestions = returnedQuestions.slice(0,req.params.number)

        // Returned response
        res.json(returnedQuestions)
    } catch (error){
        res.status(500).json({ message: error.message })  
    }
})
// New Question to add
router.post("/",  async (req, res) => {
    const question = new Question({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer
    })
    try {
        const newQuestion = await question.save()
        res.status(201).json(newQuestion)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router