require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <br/>
    <p>${date.toDateString()} ${date.toTimeString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id == id)
    if (person) {
        response.json(person)
    } else {
        response.statusMessage = `Can't find person with id ${id}`
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id != id)
    response.status(204).end()
})

morgan.token("body", (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.post('/api/persons', (request, response) => {
    const person = { ...request.body }

    if (!person.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    /*
    if (persons.find(p => p.name == person.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }
    */

    if (!person.number) {
        return response.status(400).json({
            error: "number missing"
        })
    }

    const newPerson = new Person(person)
    newPerson.save().then(result => {
        response.json(result)
    })

})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})