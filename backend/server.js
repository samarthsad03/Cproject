const express = require("express"); // require is a commmon js import 
                                    // it gets the express library 

const app = express(); // it is creating server applications
const PORT = 5000;

app.use(express.json()); // allow server to read json data from requests 
// its the middleware 
// middleware is a function that runs between receiving req and sending response 


let tasks = [];
let  id = 1;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//GET method
app.get("/tasks", (req, res) => { // this means client wants to send the data to server
  res.json(tasks);
});

//POST

app.post("/tasks", (req, res) => {

  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const newTask = {
    id: id++,
    task: task
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task added successfully",
    task: newTask
  });
});


//DELETE method
app.delete ("/tasks/:id", (req, res) => {

  const taskId = parseInt(req.params.id);

  tasks = tasks.filter(task => task.id !== taskId);

  res.json({
    message: "Task deleted successfully",
    tasks
  });
});

// .filter() cretes new array 
// it keeps every item where index != target index 
// immutable style ( better)
//  id means dyanmic parameter 
// req params  gets value from URL
// parseInt converts string to number


// put methid 

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }

    const taskToUpdate = tasks.find(t => t.id === taskId);
    // for each task t , we are checking if t.id is equal to taskId
    // if it is we return that task
    if (!taskToUpdate) {
        return res.status(404).json({ error: "Task not found" });
    }   // if task is not found we return 404 error
        //404 means resource not found

    taskToUpdate.task = task;

    res.json({
        message: "Task updated successfully",
        task: taskToUpdate
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//its starting the server and listening on port 5000