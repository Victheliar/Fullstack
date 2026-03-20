const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Victheliar:${password}@cluster0.zkgo9.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Persons = mongoose.model('Persons', personsSchema)

if (process.argv.length > 4) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Persons({
        name: name,
        number: number,
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    console.log("phonebook:")
   Persons.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
   }) 
}