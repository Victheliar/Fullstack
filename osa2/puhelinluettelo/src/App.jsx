import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    event.preventDefault()
    const nameObject = {
      content: newName,
      id: String(persons.length + 1)
    }
    setNewName(event.target.value)
    setPersons(persons + {name: newName})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewName}>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((persons) =>
        <li></li>
      )}
    </div>
  )

}

export default App