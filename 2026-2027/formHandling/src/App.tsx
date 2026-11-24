import { useState } from 'react'


function CharacterForm() {
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    class: "",
    description: "",
  })

  const [isPublic, setIsPublic] = useState(false);

  const [level, setLevel] = useState(1);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Wysłano formularz");
  }

  return (

    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Nazwa:</label>
      <input type='text' name='name' id='name' value={formData.name} onChange={handleChange} ></input>

      <label htmlFor='race'>Rasa:</label>
      <select id='race' name='race' required value={formData.race} onChange={handleChange} >

        <option value="Wojownik">Wojownik</option>
        <option value="Mag">Mag</option>
        <option value="Łucznik">Łucznik</option>

      </select>

      <label htmlFor='class'>Klasa:</label>
      <select id='class' name='class' required value={formData.class} onChange={handleChange}>

        <option value="Człowiek">Człowiek</option>
        <option value="Elf">Elf</option>
        <option value="Krasnolud">Krasnolud</option>
        <option value="Ork">Ork</option>

      </select>

      <label htmlFor='level'>Poziom:</label>
      <input type='number' name='level' id='level' value={level} min={1} max={100} onChange={(event) => setLevel(Number(event.target.value))}></input>

      <label htmlFor='description'>Opis:</label>
      <input type='textarea' name='description' id='description' value={formData.description} onChange={handleChange} ></input>

      <label htmlFor='isPublic'>Postać publiczna:</label>
      <input type='checkbox' name='isPublic' id='isPublic' checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)}></input>

      <button type='submit'>Wyślij</button>
    </form>

  )
}


function App() {


  return (
    <>
      <CharacterForm />
    </>
  )
}

export default App
