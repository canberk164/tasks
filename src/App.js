import { useEffect, useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import axios from "axios";

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};



function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, taskDesc) => {
    const response = await axios.post("https://api.jsonbin.io/v3/b/65d0f467dc74654018a62463/tasks", {
      title,
      taskDesc,
    });
    const createdTasks = [...tasks, response.data];

    setTasks(createdTasks);
  };

  const fetchTasks = async () => {
    // const response = await axios.get("https://api.jsonbin.io/v3/b/65d0f467dc74654018a62463/tasks");
    const response = req.open("GET", "https://api.jsonbin.io/v3/b/65d0f467dc74654018a62463/tasks", true);
    req.setRequestHeader("$2a$10$uo31q.RVMZ5xJhte4DubqOHILYqKzvXnLrSkYf/yQDRyts3AXhV3e", "$2a$10$QBSbWbyer4VOfSkW7zXh4exSW7ICtyicKDRSTKuOGtpHwVP50tP4G");
    setTasks(response.data);
    req.send();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTaskById = async (id) => {
    // await axios.delete(`https://api.jsonbin.io/v3/b/65d0f467dc74654018a62463/tasks/${id}`);
    await req.open("DELETE", `https://api.jsonbin.io/v3/b/65d0f467dc74654018a62463/tasks/${id}`, true);
    req.setRequestHeader("$2a$10$uo31q.RVMZ5xJhte4DubqOHILYqKzvXnLrSkYf/yQDRyts3AXhV3e", "$2a$10$QBSbWbyer4VOfSkW7zXh4exSW7ICtyicKDRSTKuOGtpHwVP50tP4G");
    
    const taskAfterDeleting = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(taskAfterDeleting);
    req.send();
  };

  const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    const response = await req.open("PUT", `https://api.jsonbin.io/v3/b/65d0f467dc74654018a62463/tasks/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
    req.setRequestHeader("$2a$10$uo31q.RVMZ5xJhte4DubqOHILYqKzvXnLrSkYf/yQDRyts3AXhV3e", "$2a$10$QBSbWbyer4VOfSkW7zXh4exSW7ICtyicKDRSTKuOGtpHwVP50tP4G");
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });
    setTasks(updatedTask);
    req.send();
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
