import { useEffect, useState } from "react";
import axios from "axios";
// import moment from "moment"; // We'll use moment.js to handle date calculations

const TaskList = ({ tasks, setTasks, updateTask, deleteTask }) => {
  const [editIndex, setEditIndex] = useState(null); // Track the current editing task
  const [editedTask, setEditedTask] = useState({
    name: "",
    description: "",
    status: "Not Completed",
    assignDate: "",
    lastDate: "",
  });
  const [filter, setFilter] = useState("All"); // Track the status filter

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://backend-srni.onrender.com/api/tasks"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [setTasks]);

  // Handle Edit Button Click
  const handleEditClick = (index, task) => {
    setEditIndex(index);
    setEditedTask(task);
  };

  // Handle Save Button Click (update task)
  const handleSaveClick = async (index) => {
    try {
      const response = await axios.put(
        `https://backend-srni.onrender.com/api/tasks/${tasks[index]._id}`,
        // `http://localhost:5000/api/tasks/${tasks[index]._id}`,
        editedTask
      );
      updateTask(index, response.data); // Update the task in UI
      setEditIndex(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle Delete Button Click (delete task)
  const handleDeleteClick = async (index) => {
    try {
      await axios.delete(
        // (`http://localhost:5000/api/tasks/${tasks[index]._id}`);
        `https://backend-srni.onrender.com/api/tasks/${tasks[index]._id}`
      );
      deleteTask(index); // Remove task from UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  // Filter Tasks Based on Status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.status === "Completed";
    if (filter === "Not Completed") return task.status === "Not Completed";
    return true; // Return all tasks for "All" filter
  });

  return (
    <div>
      <h3 className="my-3">Task Lists</h3>

      {/* Status Filter */}
      <div className="mb-3">
        <label>Status Filter: </label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="ms-2"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>

      {/* Displaying Tasks */}
      <div className="row">
        {filteredTasks.map((task, index) => (
          <div className="col-md-3" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      className="form-control mb-2"
                      value={editedTask.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="description"
                      className="form-control mb-2"
                      value={editedTask.description}
                      onChange={handleInputChange}
                    />
                    <select
                      name="status"
                      className="form-control mb-2"
                      value={editedTask.status}
                      onChange={handleInputChange}
                    >
                      <option value="Completed">Completed</option>
                      <option value="Not Completed">Not Completed</option>
                    </select>
                    <input
                      type="date"
                      name="assignDate"
                      className="form-control mb-2"
                      value={editedTask.assignDate.split("T")[0]}
                      onChange={handleInputChange}
                    />
                    <input
                      type="date"
                      name="lastDate"
                      className="form-control mb-2"
                      value={editedTask.lastDate.split("T")[0]}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{task.name}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">
                      Status:{" "}
                      <span
                        className={`badge ${
                          task.status === "Completed"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                    <p className="card-text">
                      Assign Date:{" "}
                      {new Date(task.assignDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      Last Date: {new Date(task.lastDate).toLocaleDateString()}
                    </p>
                    <p className="card-text fw-bold">
                      Remaining Days:{" "}
                      {Math.ceil(
                        (new Date(task.lastDate) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </p>
                  </>
                )}

                <div className="d-flex justify-content-between">
                  {editIndex === index ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(index, task)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
