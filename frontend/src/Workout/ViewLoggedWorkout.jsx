import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovementAPI } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ViewLoggedWorkout() {
  const location = useLocation();
  const workout = location.state?.workout;
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  }

  useEffect(() => {
    console.log(workout);
    const fetchMovements = async () => {
      if (workout?.movements) {
        setLoading(true);
        const movementsDetails = await Promise.all(
          workout.movements.map((m) =>
            getMovementAPI(m.movement).then((detail) => ({
              ...detail,
              sets: m.sets,
              metricType: m.metricType,
              metricValue: m.metricValue,
              highestData: m.highestData
            }))
          )
        );
        console.log(movementsDetails);
        setMovements(movementsDetails);
        setLoading(false);
      }
    };
    console.log(workout);

    fetchMovements();
  }, [workout]);

  if (loading) return <div>Loading...</div>;
  if (!workout) return <div>No workout found.</div>;
  console.log(workout);
  return (
    <div style={{ padding: "20px" }} className="dashboard workout-detail">
      <div className="dashboard-flex explore-title">
        <div style={{ display: "flex" }}>
          <h1 style={{ paddingRight: "30px" }}>{workout.workouts.name}</h1>
        </div>
        <button onClick={goBack} className="back-button">
          Back
        </button>
      </div>
      <h2>Date: {formatDate(workout.date)}</h2>
      <h2>{workout.workouts.bodyRegion}</h2>
      <h3>{workout.workouts.description}</h3>
      <img
        style={{ width: "40%" }}
        src={workout.workouts.imageUrl}
        alt={workout.name}
      />
      <p>{workout.description}</p>
      <h3>Summary</h3>
      <ul>
        {movements.map((item, index) => (
          <li key={index}>
            {item.name} - sets: {item.sets}, {item.metricType}:{" "}
            {item.metricValue}{" "}
            {item.metricType === "duration" ? " minutes" : ""}
          </li>
        ))}
      </ul>

      <div className="movements-list">
        {movements.map((movement) => (
          <div key={movement.name} className="movement-card">
            <img
              src={movement.imageUrl}
              alt={movement.name}
              className="movement-image-2"
            />
            <p className="movement-name-2">{movement.name}</p>
            <p>Muscle Group: {movement.muscleGroup}</p>
            <p>Sets: {movement.sets}</p>
            <p>
              {movement.metricType}: {movement.metricValue}
              {movement.metricType === "duration" ? " minutes" : ""}
            </p>
            <p>Best Data: {movement.highestData}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Total Duration: {workout.totalDuration}</p>
        <p>Notes: {workout.notes}</p>
      </div>
    </div>
  );
}
