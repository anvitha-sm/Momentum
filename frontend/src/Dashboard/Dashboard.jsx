import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myWorkouts");

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleChangePage(page) {
    navigate("/" + page);
  }

  // placeholder for following
  const following = ["person1", "person2", "person3"];

  // placeholder for user's workouts
  const workouts = [
    {
      name: "Lower Body",
      image:
        "https://static.independent.co.uk/2024/09/03/13/how-to-perform-a-barbell-squat-correctly.jpg?width=1200&height=1200&fit=crop",
    },
    {
      name: "Cardio",
      image:
        "https://squatwolf.com/cdn/shop/articles/shutterstock_215163556-min.jpg?v=1719993920",
    },
    {
      name: "Chest/ Back",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
  ];

  // placeholder for user's logged workouts
  const loggedWorkouts = [
    {
      name: "Lower Body",
      image:
        "https://static.independent.co.uk/2024/09/03/13/how-to-perform-a-barbell-squat-correctly.jpg?width=1200&height=1200&fit=crop",
    },
    {
      name: "Cardio",
      image:
        "https://squatwolf.com/cdn/shop/articles/shutterstock_215163556-min.jpg?v=1719993920",
    },
    {
      name: "Chest/ Back",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Shoulders",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
  ];

  const currentWorkouts =
    activeTab === "myWorkouts" ? workouts : loggedWorkouts;

  return (
    <div className="dashboard">
      <div className="dashboard-flex explore">
        <button onClick={() => handleChangePage("explore")}>Explore 🔍</button>
        <button>Account</button>
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
        {currentWorkouts.map((movement) => (
          <div key={movement.name} className="workout-card">
            <img
              src={movement.image}
              alt={movement.name}
              className="workout-image"
            />
            <p className="workout-name">{movement.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
