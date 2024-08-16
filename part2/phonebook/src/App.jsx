import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/Persons'
import Notify from './components/Notify'


const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const [nameFilter, setNameFilter] = useState('')
  const handleFilter = (event) => setNameFilter(event.target.value.toLowerCase())
  const filteredPersons =  persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState(1)

  useEffect(() => {
    personsService
      .getAll()
      .then(thePoopriable => {
        setPersons(thePoopriable)
      })
  }, [])

  const addPerson = (event) => { 
    event.preventDefault()

    if (!persons.find(({name}) => name === newName)) {
      const personObj = {
        name: newName,
        number: newNumber
      }
      personsService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          alertSuccess(`Added ${newName}`)
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          alertFail(`Failed to add user`)
        })
    } else {
      updatePerson()
    }
  }

  const deletePerson = ( {id, name} ) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          alertFail(`Information of ${name} has already been removed from server`)
        })
    }
  }

  const updatePerson = () => {
    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = {...existingPerson, number: newNumber}
    if (window.confirm(`Do you want to overwrite the existing number for ${newName}`)) {
      personsService
        .update(newPerson.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('') 
        })
        .catch(() => {
          alertFail('some error')
        })
    }
  }

  const alertSuccess = (message) => {
    setAlertMessage(message)
    setAlertType(0)
    setTimeout(() => {
      setAlertMessage(null)   
    }, 5000)
  }

  const alertFail = (message) => {
    setAlertMessage(message)
    setAlertType(1)
    setTimeout(() => {
      setAlertMessage(null)   
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notify message={alertMessage} type={alertType} />
      <Filter onChange={handleFilter}/>
      <h3>Add new person</h3>
      <PersonForm 
        onSubmit={addPerson} 
        onNameChange={handleNameChange} onNumberChange={handleNumberChange} 
        nameValue={newName} numberValue={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App