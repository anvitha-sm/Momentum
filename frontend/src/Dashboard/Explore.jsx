import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addedWorkouts, setAddedWorkouts] = useState(new Set());
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function toggleAdd(workout) {
    const newAddedWorkouts = new Set(addedWorkouts);
    if (newAddedWorkouts.has(workout.name)) {
      newAddedWorkouts.delete(workout.name);
    } else {
      newAddedWorkouts.add(workout.name);
    }
    setAddedWorkouts(newAddedWorkouts);
  }

  // placeholder for workouts
  const workouts = [
    {
      name: "Workout 1",
      bodyRegion: "Lower Body",
      image:
        "https://static.independent.co.uk/2024/09/03/13/how-to-perform-a-barbell-squat-correctly.jpg?width=1200&height=1200&fit=crop",
    },
    {
      name: "Workout 2",
      bodyRegion: "Upper Body",
      image:
        "https://squatwolf.com/cdn/shop/articles/shutterstock_215163556-min.jpg?v=1719993920",
    },
    {
      name: "Workout 3",
      bodyRegion: "Cardio",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
    {
      name: "Workout 4",
      bodyRegion: "Upper Body",
      image:
        "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png",
    },
  ];

  function addSelectedWorkouts() {
    console.log("Adding selected workouts:", Array.from(selectedWorkouts));
    // Perform the addition logic here, such as updating a database or state
  }

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
      <input
        type="text"
        placeholder="Search for workouts by name or body region..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="dashboard-flex workout-list">
        {filteredWorkouts.map((movement) => (
          <div key={movement.name} className="workout-card">
            <img
              src={movement.image}
              alt={movement.name}
              className="workout-image"
            />
            <p className="workout-name">{movement.name}</p>
            <button className="add-button" onClick={() => toggleAdd(movement)}>
              {addedWorkouts.has(movement.name) ? "-" : "+"}
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
