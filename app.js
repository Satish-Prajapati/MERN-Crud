const express = require('express')
const bodyParser = require("body-parser");

const Persons = require('./models/person')

const port = process.env.PORT || 4000
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS header
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
    next();
});

//Get all person
app.get('/api/person', async (req, res) => {
    try {
        const persons = await Persons.find({})
        res.status(200).send(persons)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Get person by ID
app.get('/api/person/:id', async (req, res) => {
    try {
        const person = await Persons.findOne({ _id: req.params.id })
        res.status(200).send(person)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Create new person
app.post('/api/person', async (req, res) => {
    const { firstName, lastName, age, email } = req.body
    let mail = await Persons.findOne({ email })
    if (mail) {
        return res.status(400).json({
            message: `Email is already registred`,
            success: false
        })
    }
    const Person = new Persons({
        firstName,
        lastName,
        age,
        email
    });
    try {
        const person = await Person.save();
        res.status(201).send(person)
    } catch (error) {
        res.status(500).send(error);
    }
})

//Update person by its ID
app.put('/api/person/:id', async (req, res) => {
    const { firstName, lastName, age, email } = req.body
    const updateValues = { firstName, lastName, age, email }
    try {
        const person = await Persons.findOneAndUpdate({ _id: req.params.id }, updateValues, {
            new: true,
            runValidators: true,
        });

        if (!person) {
            return res.status(404).send();
        }

        res.status(200).send(person);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Delete person by its ID
app.delete('/api/person/:id', async (req, res) => {
    try {
        const person = await Persons.findByIdAndDelete(req.params.id)
        res.status(200).send(person)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, '0.0.0.0', () => {
    console.log(`App Up & Running at Port : ${port}`)
})