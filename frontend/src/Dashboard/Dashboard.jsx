import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserWorkoutsAPI } from "../api/api";
import "./dashboard.css";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myWorkouts");
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleChangePage(page) {
    navigate("/" + page);
  }

  // placeholder for following
  const following = ["person1", "person2", "person3"];

  useEffect(() => {
    if (token) {
      fetchData();
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

  // placeholder for user's logged workouts
  const loggedWorkouts = [
    {
      name: "Lower Body",
      imageUrl:
        "https://static.independent.co.uk/2024/09/03/13/how-to-perform-a-barbell-squat-correctly.jpg?width=1200&height=1200&fit=crop",
    },
    {
      name: "Cardio",
      imageUrl:
        "https://squatwolf.com/cdn/shop/articles/shutterstock_215163556-min.jpg?v=1719993920",
    },
    {
      name: "Chest/ Back",
      imageUrl:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      imageUrl:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      imageUrl:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      imageUrl:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      imageUrl:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
  ];

  const currentWorkouts =
    activeTab === "myWorkouts" ? workouts : loggedWorkouts;

  return (
    <div className="dashboard">
      <div className="dashboard-flex explore">
        <button onClick={() => handleChangePage("explore")}>Explore 🔍</button>
        <button onClick={() => handleChangePage("profile")}>My Profile</button>
      </div>
      <div className="dashboard-flex">
        <p className="user-info">Following: {following.length}</p>
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
        {currentWorkouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <img
              src={workout.imageUrl}
              alt={workout.name}
              className="workout-image"
            />
            <p className="workout-name">{workout.name}</p>
          </div>
        ))}
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
