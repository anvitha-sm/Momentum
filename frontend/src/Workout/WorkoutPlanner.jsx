import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllWorkoutsAPI, getAllUserWorkoutsAPI, getScheduleAPI, addToScheduleAPI } from "../api/api";
import "../Dashboard/dashboard.css";
import "./WorkoutPlanner.css";
import { ErrorMessage, useErrorHandler } from "../components/ErrorHandler";

export default function WorkoutPlanner() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState({
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null
  });
  const [schedule, setSchedule] = useState([]);
  const [currentTab, setCurrentTab] = useState("all");
  const { error, setError, clearError, handleError } = useErrorHandler();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchData = async () => {
    setLoading(true);
    clearError();
    
    try {
      const allRes = await getAllWorkoutsAPI();
      setAllWorkouts(allRes || []);

      const userRes = await getAllUserWorkoutsAPI(token);
      setUserWorkouts(userRes || []);

      const scheduleRes = await getScheduleAPI({}, token);
      setSchedule(scheduleRes || []);

      const initialSelected = { ...selectedWorkouts };
      scheduleRes.forEach(item => {
        if (item.day && item.workout) {
          initialSelected[item.day] = item.workout;
        }
      });
      setSelectedWorkouts(initialSelected);
    } catch (error) {
      handleError(error, "Failed to load workout data");
    }
    setLoading(false);
  };

  const handleWorkoutSelect = (day, workout) => {
    setSelectedWorkouts(prev => ({
      ...prev,
      [day]: workout
    }));
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleSaveSchedule = async () => {
    setLoading(true);
    clearError();
    
    try {
      for (const day of days) {
        if (selectedWorkouts[day]) {
          await addToScheduleAPI({
            day: day,
            workoutId: selectedWorkouts[day]._id
          }, token);
        }
      }
      
      alert("Workout schedule saved successfully!");
      fetchData();
    } catch (error) {
      handleError(error, "Failed to save workout schedule");
    }
    
    setLoading(false);
  };

  const displayWorkouts = currentTab === "all" ? allWorkouts : userWorkouts;

  return (
    <div className="workout-planner-container">
      <div className="dashboard-flex explore">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/profile")}>My Profile</button>
        <button onClick={() => navigate("/schedule")}>View Schedule</button>
      </div>

      <div className="planner-header">
        <h2>Workout Planner</h2>
        <p>Plan your weekly workout routine by selecting workouts for each day</p>
      </div>

      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={fetchData}
        />
      )}

      <div className="tabs-container">
        <button 
          className={`tab-button ${currentTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          All Workouts
        </button>
        <button 
          className={`tab-button ${currentTab === 'my' ? 'active' : ''}`}
          onClick={() => handleTabChange('my')}
        >
          My Workouts
        </button>
      </div>

      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="planner-grid">
          <div className="days-column">
            {days.map(day => (
              <div key={day} className="day-row">
                <h3>{day}</h3>
                <div className="selected-workout">
                  {selectedWorkouts[day] ? (
                    <div className="selected-workout-card">
                      <img 
                        src={selectedWorkouts[day].imageUrl || "https://via.placeholder.com/100"} 
                        alt={selectedWorkouts[day].name}
                        className="small-workout-image"
                      />
                      <div className="selected-workout-name">
                        {selectedWorkouts[day].name}
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => handleWorkoutSelect(day, null)}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="no-workout-selected">No workout selected</div>
                  )}
                </div>
              </div>
            ))}
            <button 
              className="save-schedule-button"
              onClick={handleSaveSchedule}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Schedule"}
            </button>
          </div>
          
          <div className="workouts-selection">
            <h3>Available Workouts</h3>
            <div className="workout-cards-grid">
              {displayWorkouts.length > 0 ? (
                displayWorkouts.map(workout => (
                  <div key={workout._id} className="workout-card-select">
                    <img 
                      src={workout.imageUrl || "https://via.placeholder.com/150"} 
                      alt={workout.name}
                      className="workout-image"
                    />
                    <div className="workout-info">
                      <h4>{workout.name}</h4>
                      <div className="day-select-buttons">
                        {days.map(day => (
                          <button
                            key={day}
                            className={`day-button ${selectedWorkouts[day]?._id === workout._id ? 'selected' : ''}`}
                            onClick={() => handleWorkoutSelect(day, workout)}
                          >
                            {day.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-workouts-message">No workouts available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 