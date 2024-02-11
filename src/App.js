import { useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = (title, taskDesc) => {
    const createdTasks = [
      ...tasks,
      {
        id: Math.round(Math.random() * 999999),
        title,
        taskDesc,
      },
    ];

    setTasks(createdTasks);
  };
  const deleteTaskById = (id) => {
    const taskAfterDeleting = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(taskAfterDeleting);
  };

  const editTaskById = (id, updatedTitle, updatedTaskDesc) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });
    setTasks(updatedTask);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>TASKS</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
