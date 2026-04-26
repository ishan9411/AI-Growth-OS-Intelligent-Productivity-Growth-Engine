import React, { useEffect, useState } from "react";
import axios from "axios";
import Timer from "./Timer"
import FocusModal from "./FocusModal";

function TaskList({ tasks, fetchTasks, fetchAnalytics }) {

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const startTask = async (taskId) => {
    try {
      await axios.post("http://localhost:8000/tasks/start", {
        task_id: taskId
      });

      fetchTasks();

      alert("Task started!");

    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (taskId) => {
    setSelectedTask(taskId);
    setShowModal(true);
  };

  const submitFocus = async (taskId, rating) => {
    try {
      await axios.post("http://localhost:8000/tasks/complete", {
        task_id: taskId,
        focus_rating: rating
      });

      setShowModal(false);
      fetchTasks();
      fetchAnalytics();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h2>Tasks</h2>

      {tasks.filter(task => !task.completed).map((task) => (
        <div key={task.id} style={styles.card}>

          <h3>{task.title}</h3>
          <p>Planned: {task.planned_duration} mins</p>

          {!task.start_time && (
            <button
              style={styles.button}
              onMouseOver={(e) => e.target.style.opacity = 0.8}
              onMouseOut={(e) => e.target.style.opacity = 1}
              onClick={() => startTask(task.id)}
            >
              Start Task
            </button>
          )}

          {task.start_time && !task.completed && (
            <div>
              <Timer startTime={task.start_time} />

              <button style={styles.button} 
                onMouseOver={(e) => e.target.style.opacity = 0.8}
                onMouseOut={(e) => e.target.style.opacity = 1}  
                onClick={() => openModal(task.id)}>
                Stop Task
              </button>
            </div>
          )}

        </div>
      ))}

      {showModal && (
        <FocusModal
          taskId={selectedTask}
          onClose={() => setShowModal(false)}
          onSubmit={submitFocus}
        />
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "20px",
    margin: "15px 0",
    borderRadius: "12px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
    transition: "0.2s"
  },
  button: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #4CAF50, #2ecc71)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "10px"
  }
};

export default TaskList;