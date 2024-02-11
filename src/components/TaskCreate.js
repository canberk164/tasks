import { useState } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : "");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTaskDesc(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskFormUpdate) {
      onUpdate(task.id, title, taskDesc);
    } else {
      onCreate(title, taskDesc);
    }
    setTitle("");
    setTaskDesc("");
  };

  return (
    <div>
      {taskFormUpdate ? (
        <div className="task-update">
          <h3>Please Edit Task!</h3>
          <form className="task-form">
            <label className="task-label">Edit Header</label>
            <input
              value={title}
              onChange={handleChange}
              className="task-input"
            />
            <label className="task-label">Edit Task</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />
            <button
              className="task-button update-button"
              onClick={handleSubmit}
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <div className="task-create">
          <h3>Please add task!</h3>
          <form className="task-form">
            <label className="task-label">Header</label>
            <input
              value={title}
              onChange={handleChange}
              className="task-input"
            />
            <label className="task-label">Add Task!</label>
            <textarea
              value={taskDesc}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />
            <button className="task-button" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;
