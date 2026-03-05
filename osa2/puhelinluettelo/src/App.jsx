import { useState } from 'react'

const Filter = ({filter}) => {
  return (
      <form>
        <div>
          filter shown with <input onChange={filter}/>
        </div>
      </form>
  )
}

const PersonForm = ({person, name, number}) => {
  return (
      <form onSubmit={person}>
        <div>
          name: <input onChange={name} />
        </div>
        <div>
          number: <input onChange={number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({numbers}) => {
  return (
      <ul>
          {numbers.map((person) => (
            <li key={person.name}>{person.name} {person.number}</li>  
          ))}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    } else {
    const nameObject = {name: newName, number: newNumber}
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={handleNewFilter}/>

      <h2>add a new</h2>

      <PersonForm person={handleNewPerson} name={handleNewName} number={handleNewNumber} />

      <h2>Numbers</h2>

      <Persons numbers={personsToShow} />
    </div>
  )
}

export default App