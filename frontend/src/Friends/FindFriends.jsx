import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsersAPI, getFriendsAPI } from "../api/api";
import "../Dashboard/dashboard.css";

function FindFriends() {
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedWorkouts, setAddedWorkouts] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const res = await getAllUsersAPI(token);
      setUsers(res);
      console.log(users);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  function goBack() {
    navigate(-1);
  }

  const fetchFriends = async () => {
    try {
      const res = await getFriendsAPI(token);
      setFriends(res.map((friend) => friend._id));
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  };

  const onUserClick = (userId) => {
    const following = friends.includes(userId);
    navigate("/view-friend", {
      state: { user: userId, following: following },
    });
  };

  // filters by name or body region
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredUsers);
  return (
    <div className="dashboard explore-page">
      <div className="dashboard-flex explore-title">
        <h1>Find Friends</h1>
        <button onClick={goBack} className="back-button">
          Back
        </button>
      </div>
      <div className="input-div">
        <input
        type="text"
        placeholder="Search for friends by name or username..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="dashboard-flex workout-list">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="workout-card"
            onClick={() => onUserClick(user._id)}
          >
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindFriends;
