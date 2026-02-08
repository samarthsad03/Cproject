function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Taskster 📝</h1>

      <input
        type="text"
        placeholder="Enter a task..."
      />

      <button>Add Task</button>

      <ul>
        <li>Learn React</li>
        <li>Build Taskster</li>
      </ul>
    </div>
  );
}

export default App;
