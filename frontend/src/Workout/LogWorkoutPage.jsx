import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovementAPI } from "../api/api";
import { useNavigate } from "react-router-dom";
import { logWorkoutAPI } from "../api/api";

export default function LogWorkout() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const workout = location.state?.workout;
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalDuration, setTotalDuration] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    const fetchMovements = async () => {
      if (workout?.movements) {
        setLoading(true);
        const movementsDetails = await Promise.all(
          workout.movements.map(async (m) => {
            const detail = await getMovementAPI(m.movement);
            return {
              ...detail,
              setsPlanned: m.sets,
              metricType: m.metricType,
              metricValue: m.metricValue,
              setsActual: "", // User input for actual sets
              repsActual: "", // User input for actual reps
            };
          })
        );
        setMovements(movementsDetails);
        setLoading(false);
      }
    };

    fetchMovements();
  }, [workout]);

  function handleInputChange(index, type, value) {
    const updatedMovements = movements.map((movement, idx) => {
      if (idx === index) {
        return { ...movement, [type]: value };
      }
      return movement;
    });
    setMovements(updatedMovements);
  }

  const handleLogWorkout = async () => {
    try {
      await logWorkoutAPI(
        {
          workoutId: workout._id,
          totalDuration: totalDuration,
          notes: notes,
          movements: movements.map((m) => ({
            movement: m._id,
            sets: m.setsActual,
            metricType: m.metricType,
            metricValue: m.repsActual,
          })),
        },
        token
      );
      alert("Workout logged successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add workout:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!workout) return <div>No workout found.</div>;

  return (
    <div style={{ padding: "20px" }} className="dashboard workout-detail">
      <div className="dashboard-flex explore-title">
        <h1>Log Workout for {workout.name}</h1>
        <button onClick={goBack} className="back-button">
          Back
        </button>
      </div>
      <h2>{workout.bodyRegion}</h2>
      <img src={workout.imageUrl} alt={workout.name} style={{ width: "40%" }} />
      <h3>{workout.description}</h3>
      <ul>
        {movements.map((item, index) => (
          <li key={index}>
            <p>
              {" "}
              {item.name} - Planned sets: {item.setsPlanned}, Planned{" "}
              {item.metricType}: {item.metricValue}
            </p>
            <p>
              {" "}
              Completed sets:{" "}
              <input
                type="number"
                value={item.setsActual}
                onChange={(e) =>
                  handleInputChange(index, "setsActual", e.target.value)
                }
              />
            </p>
            <p>
              Completed {item.metricType}:{" "}
              <input
                type="number"
                value={item.repsActual}
                onChange={(e) =>
                  handleInputChange(index, "repsActual", e.target.value)
                }
              />
            </p>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex" }}>
        <label>
          Total Duration (minutes):
          <input
            type="number"
            value={totalDuration}
            onChange={(e) => setTotalDuration(e.target.value)}
            min="0"
          />
        </label>
        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </div>
      <button onClick={handleLogWorkout}>Log this workout</button>
    </div>
  );
}
