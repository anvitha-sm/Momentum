import React, { useState, useEffect } from "react";
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
  const [workoutDescription, setWorkoutDescription] = useState("");
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
          bodyRegion: bodyRegion,
          description: workoutDescription,
          movements: currentWorkout.map(
            ({ movement, sets, metricType, metricValue }) => ({
              movement: movement._id,
              sets: parseInt(sets, 10),
              metricType: metricType,
              metricValue: parseInt(metricValue),
            })
          ),
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
    const newMovement = {
      movement,
      sets: "",
      metricType: "reps",
      metricValue: "",
    };
    setCurrentWorkout((prev) => [...prev, newMovement]);
  };

  const removeFromWorkout = (movement) => {
    setCurrentWorkout((prev) =>
      prev.filter((item) => item.movement.name !== movement.name)
    );
  };

  const updateMetric = (index, field, value) => {
    setCurrentWorkout((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    );
  };

  const updateSets = (index, sets) => {
    setCurrentWorkout((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, sets } : item))
    );
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
          <div className="label-input-pair">
            <label htmlFor="workoutDescription">Description:</label>
            <textarea
              id="workoutDescription"
              value={workoutDescription}
              onChange={(e) => setWorkoutDescription(e.target.value)}
              placeholder="Enter workout description"
              rows="3" // Sets the textarea height
            />
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
            {currentWorkout.map((item, index) => (
              <div key={item.movement.name} className="movement-card detailed">
                <img
                  src={item.movement.imageUrl}
                  alt={item.movement.name}
                  className="movement-image"
                />
                <p className="movement-name">{item.movement.name}</p>
                <div className="details">
                  <input
                    type="number"
                    placeholder="Sets"
                    min="0"
                    value={item.sets}
                    onChange={(e) => updateSets(index, e.target.value)}
                  />
                  <select
                    value={item.metricType}
                    onChange={(e) =>
                      updateMetric(index, "metricType", e.target.value)
                    }
                  >
                    <option value="reps">Reps</option>
                    <option value="duration">Duration (mins)</option>
                  </select>
                  <input
                    type="number"
                    placeholder={
                      item.metricType === "reps"
                        ? "Number of Reps"
                        : "Duration in minutes"
                    }
                    min="0"
                    value={item.metricValue}
                    onChange={(e) =>
                      updateMetric(index, "metricValue", e.target.value)
                    }
                  />
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromWorkout(item.movement)}
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
