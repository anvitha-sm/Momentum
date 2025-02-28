import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsersAPI, addFriendAPI } from "../api/api";
import "../Dashboard/dashboard.css";

export default function ViewOtherUserPage() {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  const [addingFriend, setAddingFriend] = useState(false);

  function handleChangePage(page) {
    navigate("/" + page);
  }

  useEffect(() => {
    if (token && userId) {
      fetchUserData();
    } else if (!token) {
      navigate("/login");
    } else if (!userId) {
      setError("User ID is missing");
      setLoading(false);
    }
  }, [token, userId, navigate]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const users = await getAllUsersAPI();
      if (!users) {
        setError("Failed to load users");
        setLoading(false);
        return;
      }
      
      const foundUser = users.find(user => user._id === userId);
      if (foundUser) {
        setUserProfile(foundUser);
        setError("");
      } else {
        setError("User not found");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError("Failed to load user data");
    }
    setLoading(false);
  };

  const handleAddFriend = async () => {
    if (!userProfile || !token) return;
    
    setAddingFriend(true);
    try {
      await addFriendAPI({ friendId: userId }, token);
      alert(`Friend request sent to ${userProfile.username}`);
    } catch (error) {
      alert(`Failed to add ${userProfile.username} as a friend`);
    }
    setAddingFriend(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-flex explore">
        <button onClick={() => handleChangePage("dashboard")}>Dashboard</button>
        <button onClick={() => handleChangePage("explore")}>Explore 🔍</button>
      </div>
      
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : userProfile ? (
        <div className="other-user-profile">
          <div className="user-profile-header">
            <h2>{userProfile.username}'s Profile</h2>
          </div>
          
          <div className="user-stats">
            <div className="stat-item">
              <strong>Username:</strong> {userProfile.username}
            </div>
            {userProfile.fullName && (
              <div className="stat-item">
                <strong>Name:</strong> {userProfile.fullName}
              </div>
            )}
            {userProfile.workoutCount && (
              <div className="stat-item">
                <strong>Workouts Created:</strong> {userProfile.workoutCount}
              </div>
            )}
            {userProfile.loggedWorkoutCount && (
              <div className="stat-item">
                <strong>Workouts Completed:</strong> {userProfile.loggedWorkoutCount}
              </div>
            )}
          </div>
          
          <div className="user-workouts">
            <h3>Recent Workouts</h3>
            {userProfile.recentWorkouts && userProfile.recentWorkouts.length > 0 ? (
              <div className="dashboard-flex workout-list">
                {userProfile.recentWorkouts.map((workout) => (
                  <div key={workout._id} className="workout-card">
                    <img
                      src={workout.imageUrl || "https://via.placeholder.com/150"}
                      alt={workout.name}
                      className="workout-image"
                    />
                    <p className="workout-name">{workout.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-workouts-message">No recent workouts</div>
            )}
          </div>
          
          <div className="action-buttons">
            <button 
              className="add-friend-button"
              onClick={handleAddFriend}
              disabled={addingFriend}
            >
              {addingFriend ? "Adding..." : "Add Friend"}
            </button>
          </div>
        </div>
      ) : (
        <div className="error-message">Something went wrong</div>
      )}
    </div>
  );
} 