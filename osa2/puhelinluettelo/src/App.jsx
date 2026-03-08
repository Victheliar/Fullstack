import { useState, useEffect } from 'react'
import contactService from './services/contacts'

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

const Persons = ({numbers, remove}) => {
  return (
      <ul>
          {numbers.map((person) => (
            <li key={person.id}>{person.name} {person.number}<button onClick={() => remove(person.id)}>delete</button></li>
          ))}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const handleNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    } else {
    const nameObject = {name: newName, number: newNumber}
    contactService
      .create(nameObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
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

  const removeContact = (id) => {
    const person = persons.find(c => c.id === id)
    const updatedContacts = persons.filter(person => person.id !== id)

    if (window.confirm(`Delete ${person.name}?`)){
      contactService
        .remove(person.id)
        .then(setPersons(updatedContacts))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={handleNewFilter}/>

      <h2>add a new</h2>

      <PersonForm person={handleNewPerson} name={handleNewName} number={handleNewNumber} />

      <h2>Numbers</h2>

      <Persons numbers={personsToShow} remove={removeContact} />
    </div>
  )
}

export default App