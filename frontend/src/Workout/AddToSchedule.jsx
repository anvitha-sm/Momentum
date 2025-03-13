import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllWorkoutsAPI,
  saveWorkoutAPI,
  addToScheduleAPI,
} from "../api/api";
import "../Dashboard/dashboard.css";

function AddToSchedule(props) {
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedWorkouts, setAddedWorkouts] = useState(new Set());
  const [workouts, setWorkouts] = useState([]);
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
      const res = await getAllWorkoutsAPI();
      setWorkouts(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };
  const addWorkout = async (workout) => {
    try {
      await addToScheduleAPI(
        {
          day: props.day,
          workoutId: workout,
        },
        token
      );
      props.onWorkoutAdded();
      alert("workouts added successfully!");
    } catch (error) {
      console.error("Failed to add workout:", error);
    }
  };

  // filters by name or body region
  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.bodyRegion.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="dashboard explore-page">
      <div className="dashboard-flex explore-title">
        <h1>Add to {props.day}</h1>
      </div>
      <input
        type="text"
        placeholder="Search for workouts by name or body region..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="dashboard-flex workout-list">
        {filteredWorkouts.map((workout) => (
          <div
            key={workout._id}
            className="workout-card"
            onClick={() =>
              navigate(`/view-workout`, {
                state: { workout: workout },
              })
            }
          >
            <img
              src={workout.imageUrl}
              alt={workout.name}
              className="workout-image"
            />
            <p className="workout-name">{workout.name}</p>
            <button
              className="add-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from propagating to the parent div
                addWorkout(workout._id);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className="dashboard-flex add-selected"></div>
    </div>
  );
}

export default AddToSchedule;
