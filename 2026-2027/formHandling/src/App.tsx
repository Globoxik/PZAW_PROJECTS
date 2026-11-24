import { useState } from 'react'
import './App.css'


function CharacterForm() {
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    class: "",
    level: 0,
    description: "",
    isPublic: true
  })

  return (

    <form>
      <label htmlFor='name'></label>
      <input type='text' id='name'></input>

      <label htmlFor='race'></label>
      <input type='select' id='race' required></input>

      <label htmlFor='class'></label>
      <input type='select' id='class' required></input>

      <label htmlFor='level'></label>
      <input type='number' id='level'></input>

      <label htmlFor='description'></label>
      <input type='textarea' id='description'></input>

      <label htmlFor='isPublic'></label>
      <input type='checkbox' id='isPublic'></input>

      <button type='submit'></button>
    </form>

  )
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    </>
  )
}

export default App
