import React, { useEffect, useState } from "react";
import { getAllWorkoutsAPI } from "../api/api"; 
import "./Schedule.css"; 

const Schedule = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getAllWorkoutsAPI();
      if (data) {
        setWorkouts(data);
      }
    })();
  }, []);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const workoutsByDay = days.reduce((acc, day) => {
    acc[day] = workouts.filter((w) => w.day === day);
    return acc;
  }, {});

  return (
    <div className="schedule-container">
      {days.map((day) => (
        <div key={day} className="schedule-row">
          <div className="day-label">{day.toUpperCase()}:</div>

          <div className="workouts-list">
            {workoutsByDay[day] && workoutsByDay[day].length > 0 ? (
              workoutsByDay[day].map((workout) => (
                <div className="workout-card" key={workout._id}>
                  {workout.imageUrl && (
                    <img
                      src={workout.imageUrl}
                      alt={workout.name}
                      className="workout-image"
                    />
                  )}
                  <div className="workout-name">{workout.name}</div>
                </div>
              ))
            ) : (
              <div className="no-workout">No Workouts</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;