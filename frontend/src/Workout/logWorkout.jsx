import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logWorkout, getAllUserWorkoutsAPI } from "../api/api";
import "./dashboard.css";
import { NavigationBar } from "NavBar.jsx";

export default function logWorkout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [workoutsToLog, setWorkoutsToLog] = useState([]);
  const Navbar = NavigationBar();
  const loadPage = async () => {
    try {
      const list = await getAllUserWorkoutsAPI(token);
      setWorkoutsToLog(list);
    } catch (error) {
      console.error("Could not load page!");
    }
  };
  useEffect(() => {
    if (token) {
      loadPage();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <Navbar>
      <div className="dashboard">
        <div className="user-workout-head">
          <h2> Your Saved Workouts </h2>
        </div>
        <div className="dashboard-flex workout-list">
          {workoutsToLog.length > 0 ? (
            workoutsToLog.map((workout) => (
              <div className="workout-card">
                <img
                  src={workout.imageUrl}
                  alt={workout.className}
                  className="workout-image"
                ></img>
                <div className="workout-details">
                  <p className="workout-name"> {workout.name}</p>
                  <p className="workout-duration">
                    Duration: {workout.duration} min{" "}
                  </p>
                  <p className="workout-intensity">
                    Intensity: {workout.intensity}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-workouts-message">
              No added workouts to log
              <button className="log-workout" onClick={navigate("/dashboard")}>
                {" "}
                Add New Workouts{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}
