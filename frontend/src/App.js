import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Dashboard from "./components/Dashboard";
import History from "./components/History";

function App() {

  const [analytics, setAnalytics] = useState(null);
  const [isUpdating, setisUpdating] = useState(false);
  const [page, setPage] = useState("home");

  const fetchAnalytics = async () => {
    setisUpdating(true);
    const res = await axios.get("http://localhost:8000/ai-report/1");
    setAnalytics(res.data);
    setisUpdating(false);
  };

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:8000/tasks/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchAnalytics();
  }, []);

  return (
    <div style={{
      maxWidth: "800px",
      margin: "auto",
      padding: "20px"
    }}> 

    <h1>AI Growth OS</h1>

    <div style={styles.navbar}>
  <button 
    style={page === "home" ? styles.activeTab : styles.tab}
    onClick={() => setPage("home")}
    onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
  >
    Home
  </button>

  <button 
    style={page === "dashboard" ? styles.activeTab : styles.tab}
    onClick={() => setPage("dashboard")}
    onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
  >
    Dashboard
  </button>

  <button 
    style={page === "history" ? styles.activeTab : styles.tab}
    onClick={() => setPage("history")}
    onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
  >
    History
  </button>
</div>

      {page === "home" && (
        <>
          <TaskForm fetchTasks={fetchTasks} />
          <TaskList
            tasks={tasks}
            fetchTasks={fetchTasks}
            fetchAnalytics={fetchAnalytics}
          />
        </>
      )}

      {page === "dashboard" && (
        <Dashboard analytics={analytics} />
      )}

      {page === "history" && (
        <History tasks={tasks}/>
      )}

    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    background: "#1f2937",
    padding: "10px",
    borderRadius: "12px",
    marginBottom: "20px"
  },

  tab: {
    flex: 1,
    margin: "0 5px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  },

  activeTab: {
    flex: 1,
    margin: "0 5px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default App;