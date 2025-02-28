import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserWorkoutsAPI, getAllLoggedWorkoutsAPI } from "../api/api";
import "../Dashboard/dashboard.css";

export default function UserProfile() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myWorkouts");
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [loggedWorkouts, setLoggedWorkouts] = useState([]);

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleChangePage(page) {
    navigate("/" + page);
  }

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const workoutsRes = await getAllUserWorkoutsAPI(token);
      setWorkouts(workoutsRes || []);
      
      const loggedRes = await getAllLoggedWorkoutsAPI({}, token);
      setLoggedWorkouts(loggedRes || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  const currentWorkouts = activeTab === "myWorkouts" ? workouts : loggedWorkouts;

  return (
    <div className="dashboard">
      <div className="dashboard-flex explore">
        <button onClick={() => handleChangePage("explore")}>Explore 🔍</button>
        <button onClick={() => handleChangePage("dashboard")}>Dashboard</button>
      </div>
      
      <div className="user-profile-header">
        <h2>{user.username}'s Profile</h2>
      </div>
      
      <div className="dashboard-flex">
        <p className="user-info">Workouts Created: {workouts.length}</p>
        <p className="user-info">Workouts Completed: {loggedWorkouts.length}</p>
      </div>
      
      <div className="dashboard-flex workout-toggle">
        <button
          className={`my-workouts-button ${activeTab === "myWorkouts" ? "active" : ""}`}
          onClick={() => handleTabChange("myWorkouts")}
        >
          My Workouts
        </button>
        <button
          className={`logged-workout-button ${activeTab === "loggedWorkouts" ? "active" : ""}`}
          onClick={() => handleTabChange("loggedWorkouts")}
        >
          Logged Workouts
        </button>
      </div>
      
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="dashboard-flex workout-list">
          {currentWorkouts.length > 0 ? (
            currentWorkouts.map((workout) => (
              <div key={workout._id} className="workout-card">
                <img
                  src={workout.imageUrl || "https://via.placeholder.com/150"}
                  alt={workout.name}
                  className="workout-image"
                />
                <p className="workout-name">{workout.name}</p>
                {activeTab === "loggedWorkouts" && workout.completedDate && (
                  <p className="workout-date">
                    Completed: {new Date(workout.completedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="no-workouts-message">
              No {activeTab === "myWorkouts" ? "created" : "logged"} workouts found.
            </div>
          )}
        </div>
      )}
    </div>
  );
} 