import { useEffect, useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, taskDesc) => {
    const response = await axios.post("http://localhost:3004/tasks", {
      title,
      taskDesc,
    });
    const createdTasks = [...tasks, response.data];

    setTasks(createdTasks);
  };
  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3004/tasks/${id}`);
    const taskAfterDeleting = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(taskAfterDeleting);
  };

  //get tasks from api
  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3004/tasks");
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3004/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
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
