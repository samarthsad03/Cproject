import {useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState(''); //we are storing input as " "

  // tasks = current state value 
  // setTasks = function to update the state value
  // input = current state value
  // setInput = function to update the state value
  // useState is a React hook , initial value (empty array)
   
  useEffect(() => {
  fetch("http://localhost:5000/tasks")
    .then((res) => res.json())
    .then((data) => {
      setTasks(data);
    });
}, []);

//empty array means  run only when the component loads ,



  const handleAddTask = () => {

  if (input.trim() === "") return;

  fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: input,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setTasks([...tasks, data.task]);
      setInput(""); //clears input box
    });

};

    //arrow fnction . stored inside constant 
    //it is called when th ebutton is clicked
    // trim() is used to remove whitespace from both ends of a string.
  //... is a spread operator which is used to create a new array
  //by copying the existing tasks and adding the new input at the end.
  //here it is copying all the items from tasks and adds new input at the end

  
  const handleDeleteTask = (id) => {

  fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE"
  })
  .then((res) => res.json())
  .then(() => {
    setTasks(tasks.filter(task => task.id !== id));
  });

};
  // we remove task from frontend state
  // task.filter is looping thru array 
  // _ is a placeholder for the current task value
  // i is the index of the current task in the array
  // i !== index means that we want to keep all tasks except the one at the specified index
  // setTasks is updating the state with the new array of tasks after deletion
  

  const handleEditTask = (id) => {

  const newTask = prompt("Enter updated task");

  if (!newTask) return;

  fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task: newTask })
  })
  .then((res) => res.json())
  .then((data) => {

    const updatedTasks = tasks.map((t) =>
      t.id === id ? data.task : t
    );

    setTasks(updatedTasks);

  });

};

  return (
    <div style={{ padding: "20px" }}>
      <h1>TaskNest 📝</h1>

      <input 
      type="text" 
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter a new task"
       />
      {/* e.target = input element
      .value = current text
      setInput updates state  */}



      <button onClick={handleAddTask}>
      Add Task
      </button>

  <ul>
  {tasks.map((task) => (  //tasks.map loops thru array 
    <li key={task.id}>

      {task.task}

      <button onClick={() => handleEditTask(task.id)}>
        ✏️
      </button>

      <button onClick={() => handleDeleteTask(task.id)}>
        ❌
      </button>

    </li>
  ))}
</ul>
    </div>
  );  
  

  }

  export default App;
  