import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  // const [showAll, setShowAll] = useState(true)

  const handleNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    } else {
    const nameObject = {name: newName}
    setPersons(persons.concat(nameObject))
    setNewName('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {persons.map((person) => (
            <li key={person.name}>{person.name}</li>  
          ))}
      </ul>
    </div>
  )

}

export default App