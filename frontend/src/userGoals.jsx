import React, { useState, useEffect } from "react";
import { getAllMovementsAPI, getUserGoalsAPI, saveUserGoalAPI } from "./api/api"; // Import the necessary API calls
import mongoose from "mongoose";

const UserGoals = () => {
    const token = localStorage.getItem("token");
    const [movements, setMovements] = useState([]);
    const [userGoals, setUserGoals] = useState({});
    const [goalInputs, setGoalInputs] = useState({});

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

            const initialGoalInputs = movementsData.reduce((acc, movement) => {
                if (userGoalsData?.[movement._id]) {
                    acc[movement._id] = userGoalsData[movement._id];
                } else {
                    acc[movement._id] = ""
                }
                return acc;
            }, {});

            setGoalInputs(initialGoalInputs);
        } catch (error) {
            console.error(error);
        }
    };

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
            <div className="all-movements">
                {movements.map((movement) => (
                    <div key={movement._id} className="movement-card">
                        <h3>{movement.name}</h3>
                        <div className="goal-input">
                            <input
                                type="text"
                                placeholder="Enter your goal"
                                value={goalInputs[movement._id] || ""}
                                onChange={(e) =>
                                    handleGoalChange(movement._id, e.target.value)
                                }
                            />
                            <button onClick={() => handleSaveGoal(movement._id)}>
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
