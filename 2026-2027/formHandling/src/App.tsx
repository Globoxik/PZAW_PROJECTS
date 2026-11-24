import { useState } from 'react'

interface Data {
  name: string,
  race: string,
  classs: string,
  description: string,
  level: number,
  isPublic: boolean
}

function CharacterForm() {
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    class: "",
    description: "",
  })

  const [isPublic, setIsPublic] = useState(false);

  const [level, setLevel] = useState(1);

  const data = {
    formData,
    level,
    isPublic
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  }

  function validateForm() {
    const errors: Partial<Record<keyof Data, string>> = {}

    if (data.formData.name.trim().length < 3) {
      errors.name = "Login musi mieć minimum 3 znaki";
    }
    else if (data.formData.name.trim().length > 20) {
      errors.name = "Login musi mieć poniżej 20 znaków";
    }
    if (data.formData.race === "") {
      errors.race = "Rasa musi być wybrana"
    }
    if (data.formData.class === "") {
      errors.classs = "Klasa musi być wybrana"
    }
    if (data.formData.description.trim().length > 200) {
      errors.description = "Opis musi mieć poniżej 200 znaków"
    }
    if(level < 1 || level > 100)
    {
      errors.level = "Poziom może być tylko od 0 do 100";
    }

    return errors;
  }

  const [cardProps, setCardProps] = useState<Data[]>([]);

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const checkValidation = validateForm();

  if (Object.keys(checkValidation).length > 0) {
    console.error("Formularz ma błędy!", checkValidation);
    return;
  }

  const newCharacter: Data = {
    name: formData.name,
    race: formData.race,
    classs: formData.class,
    description: formData.description,
    level: level,
    isPublic: isPublic
  };

  setCardProps(prev => [...prev, newCharacter]);
}

  return (

    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Nazwa:</label>
      <input type='text' name='name' id='name' value={formData.name} onChange={handleChange}></input>

      <label htmlFor='race'>Rasa:</label>
      <select id='race' name='race' value={formData.race} onChange={handleChange} >

        <option value="Wojownik">Wojownik</option>
        <option value="Mag">Mag</option>
        <option value="Łucznik">Łucznik</option>

      </select>

      <label htmlFor='class'>Klasa:</label>
      <select id='class' name='class' value={formData.class} onChange={handleChange}>

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

function CharacterCard(  {name, race, classs, description, level, isPublic}:Data)
{
  return (
    <>
    {name}
    {race}
    {classs}
    {level}
    {description}
    {isPublic ? "tak" : "nie"}
    </>
  )
}

function CardList()
{
  return(
    
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
