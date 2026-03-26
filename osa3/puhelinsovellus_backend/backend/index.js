require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Persons = require('./models/person')

const app = express()

app.use(express.json())

morgan.token('body', function (req){
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.get("/api/persons", (request, response) => {
    Persons.find({}).then(persons => {
        response.json(persons)
    })
})

app.get("/info", (request, response) => {
    const date = new Date()
    Persons.find({}).then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)  
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Persons.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Persons.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }
            
            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Persons.findByIdAndDelete(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Persons({
        name: body.name,
        number: body.number, 
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
