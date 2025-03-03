import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLoggedWorkoutsAPI } from "../api/api";
import "../Dashboard/dashboard.css";

export default function LoggedWorkoutPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedWorkouts, setLoggedWorkouts] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  function handleChangePage(page) {
    navigate("/" + page);
  }

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllLoggedWorkoutsAPI({}, token);
      setLoggedWorkouts(res || []);
    } catch (error) {
      console.error("Failed to fetch logged workouts:", error);
    }
    setLoading(false);
  };

  const filteredWorkouts = filterDate
    ? loggedWorkouts.filter((workout) => {
        if (!workout.completedDate) return false;
        const workoutDate = new Date(
          workout.completedDate
        ).toLocaleDateString();
        return workoutDate.includes(filterDate);
      })
    : loggedWorkouts;

  return (
    <div className="dashboard">
      <div className="dashboard-flex explore">
        <button onClick={() => handleChangePage("dashboard")}>Dashboard</button>
        <button onClick={() => handleChangePage("profile")}>My Profile</button>
      </div>

      <div className="logged-workout-header">
        <h2>Logged Workouts</h2>
      </div>

      <div className="dashboard-flex filter-section">
        <input
          type="text"
          placeholder="Filter by date (MM/DD/YYYY)"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="date-filter"
        />
      </div>

      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="dashboard-flex workout-list">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <div key={workout._id} className="workout-card logged-workout">
                <img
                  src={workout.imageUrl || "https://via.placeholder.com/150"}
                  alt={workout.name}
                  className="workout-image"
                />
                <div className="workout-details">
                  <p className="workout-name">{workout.name}</p>
                  {workout.completedDate && (
                    <p className="workout-date">
                      Completed:{" "}
                      {new Date(workout.completedDate).toLocaleDateString()}
                    </p>
                  )}
                  {workout.duration && (
                    <p className="workout-duration">
                      Duration: {workout.duration} min
                    </p>
                  )}
                  {workout.intensity && (
                    <p className="workout-intensity">
                      Intensity: {workout.intensity}/10
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-workouts-message">
              No logged workouts found.
              {filterDate && " Try changing your date filter."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
