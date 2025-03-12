import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveWorkoutAPI,
  addFriendAPI,
  getUserDataAPI,
  removeFriendAPI,
} from "../api/api";
import { useLocation } from "react-router-dom";
import "../Dashboard/dashboard.css";

export default function ViewFriend() {
  const location = useLocation();
  const userId = location.state?.user;
  const isFollowing = location.state?.following;
  console.log(isFollowing);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myWorkouts");
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null);

  const isFriend = false;

  function handleChangePage(page) {
    navigate("/" + page);
  }

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const addSelectedWorkout = async (workout) => {
    console.log("Adding selected workout:", workout);
    try {
      await saveWorkoutAPI(
        {
          workoutId: workout,
        },
        token
      );
      console.log("Workout added successfully:", workout);
      alert("Workouts added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add workout:", error);
    }
  };
  console.log(workouts);

  const fetchData = async () => {
    setLoading(true);
    console.log(userId);
    try {
      const res = await getUserDataAPI(userId, token);
      setUser(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  console.log(user);

  const handleFollow = async () => {
    try {
      console.log(user._id);
      await addFriendAPI({ friendId: user._id }, token);
      alert("Friend added");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add friend:", error);
    }
    setLoading(false);
  };

  const handleUnfollow = async () => {
    try {
      console.log(user._id);
      await removeFriendAPI({ friendId: user._id }, token);
      alert("Friend removed");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to remove friend:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const currentWorkouts =
    activeTab === "myWorkouts" ? user.savedWorkouts : user.loggedWorkouts;

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="dashboard">
      <div style={{ display: "flex" }}>
        <h2 style={{ padding: "20px" }}>{user.name}'s Profile</h2>
        <button onClick={goBack} className="back-button">
          Back
        </button>
      </div>
      <button
        className="following-button"
        onClick={isFollowing ? handleUnfollow : handleFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      <div className="dashboard-flex">
        <p className="user-info">
          Workouts Complete: {user.loggedWorkouts.length}{" "}
        </p>
      </div>
      <div className="dashboard-flex workout-toggle">
        <button
          className={`my-workouts-button ${
            activeTab === "myWorkouts" ? "active" : ""
          }`}
          onClick={() => handleTabChange("myWorkouts")}
        >
          Workouts
        </button>
        <button
          className={`logged-workout-button ${
            activeTab === "loggedWorkouts" ? "active" : ""
          }`}
          onClick={() => handleTabChange("loggedWorkouts")}
        >
          Logged Workouts
        </button>
      </div>
      <div className="dashboard-flex workout-list">
        {currentWorkouts.map((workout) => {
          // Determine if we are in 'loggedWorkouts' and thus should pass the entire log
          const workoutData =
            activeTab === "loggedWorkouts"
              ? workout.workouts
              : workout.workouts || workout;
          return (
            <div
              key={workout._id || workout.loggedId} // Ensure keys are unique with fallbacks
              className="workout-card"
              onClick={() => {
                if (activeTab === "myWorkouts") {
                  navigate(`/view-workout`, {
                    state: { workout: workoutData },
                  });
                } else if (activeTab === "loggedWorkouts") {
                  navigate(`/view-log-workout`, {
                    state: { workout: workout },
                  });
                }
              }}
            >
              <img
                src={
                  workoutData.imageUrl ||
                  (workoutData.workout && workoutData.workout.imageUrl)
                }
                alt={
                  workoutData.name ||
                  (workoutData.workout && workoutData.workout.name)
                }
                className="workout-image"
              />
              <p className="workout-name">
                {workoutData.name ||
                  (workoutData.workout && workoutData.workout.name)}
              </p>
              <button
                className="add-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from propagating to the parent div
                  addSelectedWorkout(workout._id);
                }}
              >
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
