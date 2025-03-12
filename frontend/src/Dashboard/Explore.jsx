import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWorkoutsAPI, saveWorkoutAPI } from "../api/api";
import "./dashboard.css";

function Explore() {
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

  function goBack() {
    navigate(-1);
  }

  function toggleAdd(workout) {
    const newAddedWorkouts = new Set(addedWorkouts);
    if (newAddedWorkouts.has(workout._id)) {
      newAddedWorkouts.delete(workout._id);
    } else {
      newAddedWorkouts.add(workout._id);
    }
    setAddedWorkouts(newAddedWorkouts);
  }

  const addSelectedWorkouts = async () => {
    try {
      for (const workout of addedWorkouts) {
        await saveWorkoutAPI(
          {
            workoutId: workout,
          },
          token
        );
      }

      alert("All workouts added successfully!");
      navigate("/dashboard");
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
        <h1>Explore 🔍</h1>
        <button onClick={goBack} className="back-button">
          Back
        </button>
      </div>
      <div className="input-div">
      <input
          type="text"
          placeholder="Search for workouts by name or body region..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
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
                toggleAdd(workout);
              }}
            >
              {addedWorkouts.has(workout._id) ? "-" : "+"}
            </button>
          </div>
        ))}
      </div>
      <div className="dashboard-flex add-selected">
        <button onClick={addSelectedWorkouts} className="add-selected-button">
          Add Selected Workouts
        </button>
      </div>
    </div>
  );
}

export default Explore;
