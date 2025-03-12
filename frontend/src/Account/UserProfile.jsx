import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserWorkoutsAPI, getAllLoggedWorkoutsAPI } from "../api/api";
import "../Dashboard/dashboard.css";
import { ErrorMessage, useErrorHandler } from "../components/ErrorHandler";

export default function UserProfile() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myWorkouts");
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [loggedWorkouts, setLoggedWorkouts] = useState([]);
  const { error, setError, clearError, handleError } = useErrorHandler();

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
    clearError();
    
    try {
      const workoutsRes = await getAllUserWorkoutsAPI(token);
      setWorkouts(workoutsRes || []);
      
      const loggedRes = await getAllLoggedWorkoutsAPI({}, token);
      setLoggedWorkouts(loggedRes || []);
    } catch (error) {
      handleError(error, "Failed to load user data");
    }
    setLoading(false);
  };

  const currentWorkouts = activeTab === "myWorkouts" ? workouts : loggedWorkouts;

  return (
    <div className="dashboard">
      <div className="dashboard-flex explore">
        <button onClick={() => handleChangePage("explore")}>Explore 🔍</button>
        <button onClick={() => handleChangePage("dashboard")}>Dashboard</button>
        <button onClick={() => handleChangePage("schedule")}>My Schedule</button>
        <button onClick={() => handleChangePage("workout-planner")}>Workout Planner</button>
      </div>
      
      <div className="user-profile-header">
        <h2>{user.username}'s Profile</h2>
      </div>
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={fetchData}
        />
      )}
      
      <div className="dashboard-flex">
        <p className="user-info">Workouts Created: {workouts.length}</p>
        <p className="user-info">Workouts Completed: {loggedWorkouts.length}</p>
        <button className="analytics-button" onClick={() => handleChangePage("analytics")}>
          View Workout Analytics
        </button>
      </div>
      
      <div className="user-goals-section">
        <h3>My Fitness Goals</h3>
        <div className="dashboard-flex">
          <button className="goals-button" onClick={() => handleChangePage("goals")}>
            Manage Goals
          </button>
        </div>
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
              <div 
                key={workout._id} 
                className="workout-card"
                onClick={() => {
                  if (activeTab === "myWorkouts") {
                    navigate(`/workout/${workout._id}`);
                  } else {
                    navigate(`/logged-workout/${workout._id}`);
                  }
                }}
              >
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
      
      <div className="friends-section">
        <h3>Friends</h3>
        <div className="dashboard-flex">
          <button className="find-friends-button" onClick={() => handleChangePage("find-friends")}>
            Find Friends
          </button>
        </div>
      </div>
    </div>
  );
} 