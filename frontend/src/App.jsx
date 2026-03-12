import {useState} from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState(''); //we are storing input as " "

  // tasks = current state value 
  // setTasks = function to update the state value
  // input = current state value
  // setInput = function to update the state value
  // useState is a React hook , initial value (empty array)
   
  const handleAddTask = () => {
    const trimmedInput = input.trim();

    if (trimmedInput === '')  return ;

    if (tasks.includes(trimmedInput)) {
      alert('Task already exists!');
      return;
    }

    setTasks([...tasks, trimmedInput]);
    setInput('');
  };

    //arrow fnction . stored inside constant 
    //it is called when th ebutton is clicked
    // trim() is used to remove whitespace from both ends of a string.
  //... is a spread operator which is used to create a new array
  //by copying the existing tasks and adding the new input at the end.
  //here it is copying all the items from tasks and adds new input at the end

  
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks  (newTasks);
  };
  // task.filter is looping thru array 
  // _ is a placeholder for the current task value
  // i is the index of the current task in the array
  // i !== index means that we want to keep all tasks except the one at the specified index
  // setTasks is updating the state with the new array of tasks after deletion
  

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
  {tasks.length === 0 ? (
    <p>No tasks yet 🚀</p>
  ) : (
    tasks.map((task, index) => (
      <li key={index}>
        {task}
        <button
          style={{ marginLeft: "10px", color: "red" }}
          onClick={() => handleDeleteTask(index)}
        >
          ❌
        </button>
      </li>
    ))
  )}
</ul>
    </div>
  );  
  

  }

  export default App;
  