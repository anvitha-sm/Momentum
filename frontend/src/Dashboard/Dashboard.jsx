import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUserWorkoutsAPI,
  getAllLoggedWorkoutsAPI,
  getFriendsAPI,
  deleteWorkoutAPI,
} from "../api/api";
import "./dashboard.css";

const Dropdown = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="dropdown-content">
      {children}
      <button onClick={onClose} className="close-dropdown">
        Close
      </button>
    </div>
  );
};

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myWorkouts");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [loggedWorkouts, setLoggedWorkouts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleChangePage(page) {
    navigate("/" + page);
  }

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    if (token) {
      fetchData();
      fetchLoggedData();
      fetchFriends();
    } else {
      navigate("/login");
    }
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllUserWorkoutsAPI(token);
      setWorkouts(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  const fetchLoggedData = async () => {
    setLoading(true);
    try {
      const res = await getAllLoggedWorkoutsAPI(token);
      setLoggedWorkouts(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const res = await getFriendsAPI(token);
      setFriends(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  const removeWorkout = async (id) => {
    try {
      await deleteWorkoutAPI(id, token);
      alert("Workout removed");
      const updatedWorkouts = workouts.filter((workout) => workout._id !== id);
      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.error("Failed to remove the workout:", error);
    }
  };

  const handleFriendClick = (id) => {
    navigate("/view-friend", {
      state: { user: id, following: true },
    });
  };

  const currentWorkouts =
    activeTab === "myWorkouts" ? workouts : loggedWorkouts;
  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <div className="dashboard-flex">
        <button
          className="view-profile-button"
          onClick={() => handleChangePage("explore")}
        >
          Explore 🔍
        </button>
      </div>
      <div className="dashboard-flex">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="user-info"
        >
          Following: {friends.length}
        </button>
        <Dropdown show={showDropdown} onClose={handleCloseDropdown}>
          <ab onClick={() => navigate("/find-friend")}>Search</ab>
          {friends.length > 0 && showDropdown && (
            <ul>
              {friends.map((friend) => (
                <li
                  key={friend._id}
                  className="friend-name-list"
                  onClick={() => handleFriendClick(friend._id)}
                >
                  <a style={{ cursor: "pointer" }}>{friend.username}</a>
                </li>
              ))}
            </ul>
          )}
        </Dropdown>
        <p className="user-info1">
          Workouts Complete: {loggedWorkouts.length}{" "}
        </p>
      </div>
      <div className="dashboard-flex workout-toggle">
        <button
          className={`my-workouts-button ${
            activeTab === "myWorkouts" ? "active" : ""
          }`}
          onClick={() => handleTabChange("myWorkouts")}
        >
          My Workouts
        </button>
        <button
          className={`logged-workout-button ${
            activeTab === "loggedWorkouts" ? "active" : ""
          }`}
          onClick={() => handleTabChange("loggedWorkouts")}
        >
          Logged Workouts
        </button>
        <button
          className="view-create-workout-button"
          onClick={() => handleChangePage("createworkout")}
        >
          Create Workout
        </button>
      </div>
      <div className="dashboard-flex workout-list">
        {currentWorkouts.length === 0 ? (
          <div className="no-workouts-container">
            <p className="no-workouts-message">
              {activeTab === "myWorkouts"
                ? "You don't have any workouts yet. Create one to get started!"
                : "You haven't logged any workouts yet."}
            </p>
          </div>
        ) : (
          currentWorkouts.map((workout) => {
            const workoutData =
              activeTab === "loggedWorkouts"
                ? workout.workouts
                : workout.workouts || workout;
            return (
              <div
                key={workout._id || workout.loggedId}
                className="workout-card"
                onClick={() => {
                  if (activeTab === "myWorkouts") {
                    navigate(`/view-workout`, {
                      state: { workout: workoutData },
                    });
                  } else if (activeTab === "loggedWorkouts") {
                    navigate(`/view-log-workout`, {
                      state: { workout: workout },
                    });
                  }
                }}
              >
                <img
                  src={
                    workoutData.imageUrl ||
                    (workoutData.workout && workoutData.workout.imageUrl) ||
                    "https://via.placeholder.com/150?text=Workout"
                  }
                  alt={
                    workoutData.name ||
                    (workoutData.workout && workoutData.workout.name) ||
                    "Workout"
                  }
                  className="workout-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150?text=Workout";
                  }}
                />
                <p className="workout-name">
                  {workoutData.name ||
                    (workoutData.workout && workoutData.workout.name)}
                </p>
                {activeTab === "myWorkouts" && (
                  <button
                    className="remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWorkout(workout._id);
                    }}
                    title="Remove workout"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="dashboard-flex navigation-buttons">
        <button
          className="view-all-logged-workouts"
          onClick={() => handleChangePage("schedule")}
        >
          View Schedule
        </button>
        <button
          className="view-analytics-button"
          onClick={() => handleChangePage("logged-analytics")}
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}
