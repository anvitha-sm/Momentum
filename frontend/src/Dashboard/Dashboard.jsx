import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUserWorkoutsAPI,
  getAllLoggedWorkoutsAPI,
  getFriendsAPI,
  getAllUsersAPI,
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
    setShowDropdown(false); // Function to close the dropdown
  };

  // placeholder for following
  const following = ["person1", "person2", "person3"];

  useEffect(() => {
    if (token) {
      fetchData();
      fetchLoggedData();
      fetchFriends();
    }
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllUserWorkoutsAPI(token);
      console.log(res);
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
      console.log(res);
      setFriends(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  const handleFriendClick = (id) => {
    navigate("/view-friend", {
      state: { user: id, following: true },
    });
  };

  const currentWorkouts =
    activeTab === "myWorkouts" ? workouts : loggedWorkouts;
  console.log(friends);
  console.log(friends.length);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="dashboard">
      <div className="dashboard-flex explore">
        <button onClick={() => handleChangePage("explore")}>Explore 🔍</button>
        <button onClick={() => handleChangePage("profile")}>My Profile</button>
      </div>
      <div className="dashboard-flex">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="user-info"
        >
          Following: {friends.length}
        </button>
        <Dropdown show={showDropdown} onClose={handleCloseDropdown}>
          {friends.length > 0 && showDropdown && (
            <ul>
              {friends.map((friend) => (
                <li
                  key={friend._id}
                  onClick={() => handleFriendClick(friend._id)}
                >
                  <a style={{ cursor: "pointer" }}>{friend.username}</a>
                </li>
              ))}
            </ul>
          )}
          <a onClick={() => navigate("/find-friend")}>Search for Friends</a>
        </Dropdown>
        <p className="user-info">Workouts Complete: {loggedWorkouts.length} </p>
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
          className="create-workout-button"
          onClick={() => handleChangePage("createworkout")}
        >
          Create Workout
        </button>
      </div>
      <div className="dashboard-flex workout-list">
        {currentWorkouts.map((workout) => {
          // Determine if we are in 'loggedWorkouts' and thus should pass the entire log
          const workoutData =
            activeTab === "loggedWorkouts"
              ? workout.workouts
              : workout.workouts || workout;
          return (
            <div
              key={workout._id || workout.loggedId} // Ensure keys are unique with fallbacks
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
                  (workoutData.workout && workoutData.workout.imageUrl)
                }
                alt={
                  workoutData.name ||
                  (workoutData.workout && workoutData.workout.name)
                }
                className="workout-image"
              />
              <p className="workout-name">
                {workoutData.name ||
                  (workoutData.workout && workoutData.workout.name)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="dashboard-flex navigation-buttons">
        <button
          className="view-all-logged-workouts"
          onClick={() => handleChangePage("logged-workouts")}
        >
          View All Logged Workouts
        </button>
      </div>
      
      <div className="dashboard-flex navigation-buttons">
        <button 
          className="view-all-logged-workouts"
          onClick={() => handleChangePage("logged-workouts")}
        >
          View All Logged Workouts
        </button>
      </div>
    </div>
  );
}
