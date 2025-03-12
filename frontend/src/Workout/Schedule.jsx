import React, { useEffect, useState } from "react";
import { getScheduleAPI } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Schedule.css";
import { removeFromScheduleAPI } from "../api/api";
import Explore from "../Dashboard/Explore";
import AddToSchedule from "./AddToSchedule";

const Schedule = () => {
  const token = localStorage.getItem("token");
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [day, setDay] = useState(null);
  const [addingWorkout, setAddingWorkout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getScheduleAPI(token);
      console.log(res);
      setWorkouts(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  const addWorkout = async (day) => {
    setDay(day);
    setAddingWorkout(true);
  };

  const removeWorkout = async (day, workout) => {
    try {
      await removeFromScheduleAPI({ day: day, workoutId: workout }, token); // Assuming this API call deletes the workout
      alert("Workout removed");
      refreshWorkouts();
    } catch (error) {
      console.error("Failed to remove the workout:", error);
    }
  };

  const refreshWorkouts = async () => {
    setAddingWorkout(false);
    try {
      const res = await getScheduleAPI(token);
      setWorkouts(res);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  };

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="schedule-container">
        {days.map((day) => (
          <div key={day} className="schedule-row">
            <div className="day-label">{day.toUpperCase()}:</div>
            <div className="workouts-list-schedule">
              {workouts[day] && workouts[day].length > 0 ? (
                workouts[day].map((workout) => (
                  <div
                    className="workout-card-schedule"
                    key={workout._id}
                    onClick={() =>
                      navigate(`/view-workout`, {
                        state: { workout: workout },
                      })
                    }
                  >
                    {workout.imageUrl && (
                      <img
                        src={workout.imageUrl}
                        alt={workout.name}
                        className="workout-image-schedule"
                      />
                    )}
                    <div className="workout-name-schedule">{workout.name}</div>
                    <button
                      className="schedule-remove-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the navigation to the workout details
                        removeWorkout(day, workout._id);
                      }}
                    >
                      -
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-workout-schedule"></div>
              )}
            </div>
            <button
              className="schedule-add-button"
              onClick={() => addWorkout(day)}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}></div>
      <div style={{ width: "100%",  background: "linear-gradient(to top, #181a1b, #edbfff)"}}>
        {" "}
        {addingWorkout ? (
          <AddToSchedule day={day} onWorkoutAdded={refreshWorkouts} />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
