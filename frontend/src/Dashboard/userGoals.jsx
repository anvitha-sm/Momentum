import React, { useState, useEffect } from "react";
import "./userGoals.css";
import {
  getAllMovementsAPI,
  getUserGoalsAPI,
  saveUserGoalAPI,
} from "../api/api";

const UserGoals = () => {
  const token = localStorage.getItem("token");
  const [movements, setMovements] = useState([]);
  const [userGoals, setUserGoals] = useState({});
  const [goalInputs, setGoalInputs] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (token) {
      fetchMovementsAndGoals();
    }
  }, [token]);

  const fetchMovementsAndGoals = async () => {
    try {
      const movementsData = await getAllMovementsAPI(token);
      const userGoalsData = await getUserGoalsAPI(token);

      setMovements(movementsData);
      setUserGoals(userGoalsData);

      const initialGoalInputs = {};

      movementsData.forEach((movement) => {
        const userGoal = userGoalsData.find(
          (goal) => goal.movement === movement._id
        );
        if (userGoal) {
          initialGoalInputs[movement._id] = userGoal.goal;
        } else {
          initialGoalInputs[movement._id] = "";
        }
      });
      setGoalInputs(initialGoalInputs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredData(
        movements.filter((movement) =>
          movement.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(movements);
      console.log(filteredData);
    }
  }, [searchQuery, movements]);

  const handleGoalChange = (movementId, value) => {
    setGoalInputs((prevState) => ({
      ...prevState,
      [movementId]: value,
    }));
  };

  const handleSaveGoal = async (movementId) => {
    const goal = goalInputs[movementId];
    try {
      await saveUserGoalAPI({ movementId, goal }, token);
      setUserGoals((prevState) => ({
        ...prevState,
        [movementId]: goal,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="all-movement-goals">
      <h1>Set Your Movement Goals</h1>
      <input
        type="text"
        className="search-input"
        placeholder={"Search for a movement"}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="all-movements">
        {filteredData.map((movement) => (
          <div key={movement._id} className="movement-card-goal">
            <h3>{movement.name}</h3>
            <div className="goal-input">
              <input
                type="text"
                placeholder="Enter your goal"
                value={goalInputs[movement._id] || ""}
                onChange={(e) => handleGoalChange(movement._id, e.target.value)}
              />
              <button className="save-goal-button" onClick={() => handleSaveGoal(movement._id)}>
                Save Goal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGoals;
