import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
import { router } from './workouts.js';
import "./CreateWorkout.css";
import { getAllMovementsAPI, createWorkoutAPI } from "../api/api.jsx";
import { useNavigate } from "react-router-dom";
const CreateWorkout = () => {
  const token = localStorage.getItem("token");
  const [workoutName, setWorkoutName] = useState("");
  const [bodyRegion, setBodyRegion] = useState("Upper Body");
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [movements, setMovements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllMovementsAPI();
      setMovements(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  const saveWorkout = async () => {
    try {
      await createWorkoutAPI(
        {
          name: workoutName,
          movements: currentWorkout,
        },
        token
      );
      alert("Workout added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add workout:", error);
    }
  };

  const addToWorkout = (movement) => {
    if (!currentWorkout.includes(movement)) {
      setCurrentWorkout((prev) => [...prev, movement]);
    }
  };

  const removeFromWorkout = (movement) => {
    if (currentWorkout.includes(movement)) {
      setCurrentWorkout((prev) => prev.filter((item) => item !== movement));
    }
  };

  // Filter movements based on the search query (case-insensitive)
  const filteredMovements = movements.filter((movement) =>
    movement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="create-workout-page">
      {/* Top Header */}
      <header className="header">
        <div className="header-left">Create Workout</div>
        <div className="header-right">Account</div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Side */}
        <section className="left-content">
          <div className="input-row">
            <div className="label-input-pair">
              <label htmlFor="workoutName">Name:</label>
              <input
                id="workoutName"
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Enter workout name"
              />
            </div>
            <div className="label-input-pair">
              <label htmlFor="bodyRegion">Body Region:</label>
              <select
                id="bodyRegion"
                value={bodyRegion}
                onChange={(e) => setBodyRegion(e.target.value)}
              >
                <option>Upper Body</option>
                <option>Lower Body</option>
                <option>Full Body</option>
              </select>
            </div>
          </div>

          <h2 className="section-title">Add Movement</h2>
          <input
            type="text"
            placeholder="Search for movements..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="movements-list">
            {filteredMovements.map((movement) => (
              <div key={movement.name} className="movement-card">
                <img
                  src={movement.imageUrl}
                  alt={movement.name}
                  className="movement-image"
                />
                <p className="movement-name">{movement.name}</p>
                <button
                  className="add-button"
                  onClick={() => addToWorkout(movement)}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Side */}
        <section className="right-content">
          <h2 className="section-title">Current Workout</h2>
          <div className="current-workout-list">
            {currentWorkout.map((movement) => (
              <div key={movement.name} className="movement-card">
                <img
                  src={movement.imageUrl}
                  alt={movement.name}
                  className="movement-image"
                />
                <p className="movement-name">{movement.name}</p>
                <button
                  className="add-button"
                  onClick={() => removeFromWorkout(movement)}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <button className="save-workout" onClick={saveWorkout}>
          Create Workout
        </button>
      </footer>
    </div>
  );
};

export default CreateWorkout;
