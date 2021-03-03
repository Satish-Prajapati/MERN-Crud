import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import List from "./components/List";
import View from "./components/View";
import AddEdit from "./components/Add-Edit";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const apiUrl = 'http://localhost:4000/api/person'

function App() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get(apiUrl)
      .then(res => {
        const persons = res.data;
        setPersons(persons);
      })
  },[])

  const deletePerson = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(res => {
        const newPersonList = persons.filter(person => {
          return person._id !== id
        })
        setPersons(newPersonList);
      }).catch(err => alert('Unable to Delete'))
  }

  const addPerson = (e) => {
    e.preventDefault()
    const firstName = e.target.elements.firstName.value,
          lastName = e.target.elements.lastName.value,
          age = e.target.elements.age.value,
          email = e.target.elements.email.value

    axios.post(apiUrl, {
      firstName,
      lastName,
      age,
      email
    }).then(res => {
      const newPerson = res.data
      setPersons([...persons, newPerson])
      alert('New person added')
    })
      .catch(err => alert('Unable to Add Person. Make sure you are using unique email'))
  }

  const updatePerson = (e, personId) => {
    e.preventDefault()
    const firstName = e.target.elements.firstName.value,
          lastName = e.target.elements.lastName.value,
          age = e.target.elements.age.value,
          email = e.target.elements.email.value

    axios.put(`${apiUrl}/${personId}`, {
        firstName,
        lastName,
        age,
        email
    }).then(res => {
        const personsClone = [...persons]
        const updatedPerson = personsClone.map(person => {
          if(person._id === personId) {
              person.firstName = firstName
              person.lastName = lastName
              person.age = age
              person.email = email
          }
          return {...person}
        })
        setPersons(updatedPerson)
        alert('Updated')
    })
    .catch(err => alert('Unable to Update'))
}

  return (
    <>
      <Router>
        <div className="container">
        <Route exact path='/' render={() => (
          <List users={persons} deleteUser={deletePerson} />  
        )} />
        <Route path='/view' render={() => (
          <View />
        )} />
        <Route path='/add-edit' render={() => (
          <AddEdit updateUser={updatePerson} addUser={addPerson} />
        )} />
        </div>
      </Router>
    </>
  );
}

export default App;
