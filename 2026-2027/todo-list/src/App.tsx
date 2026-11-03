import { useState } from 'react'
import './App.css'

interface TaskProps
{
  details: string;

  isChecked: boolean;
}

function Task({details, isChecked}: TaskProps)
{
return(
    <div>
      <b>{details}</b>
      <input type='checkbox' defaultChecked={isChecked}></input>
    </div>
  );
}


function App() {
  
const [text, setText] = useState("");
const [tasks, setTasks] = useState<TaskProps[]>([]);
let displayAll = true
let displayDone = false
let displayUnfinished = false

  return (
    <>
    <header>Todo List</header>
    <div id="add-tasks">
      <input type='text' placeholder='nazwa taska...' onChange={(e) => setText(e.target.value)}></input>
      <button onClick={() => {text ? setTasks([...tasks, {details: text, isChecked:false}]) : console.error("pusty input!");
    }}>+</button>
    <button onClick={() => {displayAll = true; displayDone = false; displayUnfinished = false;}}>Wszystkie</button>
    <button onClick={() => {displayAll = false; displayDone = true; displayUnfinished = false;}}>Wykonane</button>
    <button onClick={() => {displayAll = false; displayDone = false; displayUnfinished = true;}}>Niewykonane</button>
    </div>
    <div id="tasks">
    {displayAll && (tasks.map((task, index) => (
      <Task key={index} {...task}/>
    )))}
        {displayDone && ([...tasks].filter((task) => task.isChecked === true).map((task, index) => (
      <Task key={index} {...task}/>
    )))}
        {displayUnfinished && (([...tasks].filter((task) => task.isChecked === false)).map((task, index) => (
      <Task key={index} {...task}/>
    )))}
    </div>
    <b>Pozostało {([...tasks].filter((task) => task.isChecked === false)).length} zadań do zrobienia</b>
    </>
  )
}

export default App

