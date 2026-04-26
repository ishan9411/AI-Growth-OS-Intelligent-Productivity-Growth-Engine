import React, { useState } from "react";
import axios from "axios";

function TaskForm({fetchTasks}) {

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: title,
      planned_duration: parseInt(duration),
      user_id: 1
    };

    try {
      await axios.post("http://localhost:8000/tasks/", taskData);
      fetchTasks();
      alert("Task created successfully!");
      setTitle("");
      setDuration("");
    } catch (error) {
      console.error(error);
      alert("Error creating task");
    }
  };

  return (
  <div style={styles.card}>

    <h2 style={styles.title}> Create New Task</h2>

    <form onSubmit={handleSubmit} style={styles.form}>

      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        onFocus={(e) => e.target.style.border = "1px solid #6366f1"}
        onBlur={(e) => e.target.style.border = "1px solid #e5e7eb"}
      />

      <input
        type="number"
        placeholder="Planned duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={styles.input}
        onFocus={(e) => e.target.style.border = "1px solid #6366f1"}
        onBlur={(e) => e.target.style.border = "1px solid #e5e7eb"}
      />

      <button
        type="submit"
        style={styles.button}
        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
        onFocus={(e) => e.target.style.border = "1px solid #6366f1"}
        onBlur={(e) => e.target.style.border = "1px solid #e5e7eb"}
      >
        Create Task
      </button>

    </form>

  </div>
);
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.08)",
    marginBottom: "25px",
    transition: "0.3s"
  },

  title: {
    marginBottom: "15px",
    color: "#111827"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s"
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s"
  }
};

export default TaskForm;