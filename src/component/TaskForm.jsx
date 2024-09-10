import { useState } from "react";
import axios from "axios";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    status: "Not Completed",
    assignDate: "",
    lastDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !task.name.trim() ||
      !task.description.trim() ||
      !task.assignDate ||
      !task.lastDate
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setError(""); // Clear error if form is valid

    try {
      const response = await axios.post(
        "https://backend-srni.onrender.com/api/tasks",
        task
      );
      addTask(response.data); // Update the UI with the newly added task
      setTask({
        name: "",
        description: "",
        status: "Not Completed",
        assignDate: "",
        lastDate: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      {error && <p className="text-danger">{error}</p>}

      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Task Name"
          value={task.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="description"
          className="form-control mb-2"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group d-flex mb-3 ">
        <p className="text-center m-2 text-success fw-bolder">Assign Date</p>
        <input
          type="date"
          name="assignDate"
          className="form-control m-2  w-75"
          placeholder="Assign Date"
          value={task.assignDate}
          onChange={handleChange}
        />

        <p className="text-center m-2 text-danger fw-bolder">Finish Date</p>
        <input
          type="date"
          name="lastDate"
          className="form-control m-2 w-75"
          placeholder="Last Date"
          value={task.lastDate}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-success text-white fw-bold rounded w-25 h-50"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
