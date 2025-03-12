import React, { useState, useEffect } from "react";
import { getAllLoggedWorkoutsAPI, getUserGoalsAPI, getAllMovementsAPI } from "../api/api.jsx";
import './LoggedWorkoutAnalytics.css';

const LoggedWorkoutAnalytics = () => {
    const token = localStorage.getItem("token");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("movement");   
    const [loading, setLoading] = useState(true);
    const [loggedWorkouts, setLoggedWorkouts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [highestData, setHighestData] = useState({});
    const [streaks, setStreaks] = useState({ longest: 0, current: 0 });
    const [goals, setGoals] = useState([]);
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        if (token) {
            fetchData();
            fetchGoals();
            fetchMovements();
        }
    }, [token]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getAllLoggedWorkoutsAPI(token);
            const sorted = res.sort((a, b) => new Date(b.date) - new Date(a.date));
            setLoggedWorkouts(sorted);
            calculateHighestData(sorted);
            calculateStreaks(sorted);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const fetchGoals = async () => {
        try {
            const res = await getUserGoalsAPI(token); 
            setGoals(res); 
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMovements = async () => {
        try {
            const res = await getAllMovementsAPI(token); 
            setMovements(res); 
        } catch (error) {
            console.error(error);
        }
    };

    const calculateHighestData = (loggedWorkouts) => {
        const highest = {};
        loggedWorkouts.forEach((workout) => {
            workout.movements.forEach((logged) => {
                if (!highest[logged.movement.name] || logged.highestData > highest[logged.movement.name].value) {
                    highest[logged.movement.name] = { value: logged.highestData, date: workout.date };
                }
            });
        });
        setHighestData(highest);
    };

    const calculateStreaks = (workouts) => {
        let longestStreak = 0, currStreak = 0;
        let lastDate = null;
        const sortedDates = [...new Set(workouts.map(w => new Date(w.date).toDateString()))].sort((a, b) => new Date(a) - new Date(b));

        sortedDates.forEach((date) => {
            if (lastDate && date - lastDate === 86400000) {
                currStreak++;
            } else {
                if (currStreak > longestStreak) {
                    longestStreak = currStreak;
                }
                currStreak = 1;
            }
            lastDate = date;
            setStreaks({ longest: longestStreak, current: currStreak });
        });
    };

    useEffect(() => {
        console.log(searchQuery);
        if (searchQuery) {
            console.log(searchQuery.trim() === "");
            if (searchType === "movement") {
                setFilteredData(
                    loggedWorkouts.filter((workout) =>
                      workout.movements.some((logged) => {
                        if (logged.movement && logged.movement.name) {
                          return logged.movement.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase());
                        }
                        return false;
                      })
                    )
                  );
                  console.log(filteredData);
            } else {
                setFilteredData(loggedWorkouts.filter((workout) =>
                    workout.workouts.name.toLowerCase().includes(searchQuery.toLowerCase())
                ));
            }
        } else {
            setFilteredData(loggedWorkouts);
            console.log(filteredData);
        }
    }, [searchQuery, searchType, loggedWorkouts]);

    return (
        <div className="logged-workouts-analytics">
            <header className="header">
                <h1>Logged Workout Analytics</h1>
            </header>
            <div className="content-container"> 
                <div className="left-side-content">
                    <div className="search-logged">
                        <input
                            type="text"
                            placeholder={searchType === "movement" ? "Search for a movement" : "Search for a workout"}
                            value={searchQuery}
                            className="search-input"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <label>
                            <input
                            type="radio"
                            name="searchType" 
                            value="movement"
                            checked={searchType === "movement"}
                            onChange={() => setSearchType("movement")}
                            />
                            Movements
                        </label>
                        <label>
                            <input
                            type="radio"
                            name="searchType" 
                            value="workout"
                            checked={searchType === "workout"}
                            onChange={() => setSearchType("workout")}
                            />
                            Workouts
                        </label>
                    </div>
                        <div className="search-results">
                            {searchType === "movement" ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Workout Name</th>
                                            <th>Movements</th>
                                            <th>Sets</th>
                                            <th>Reps/Duration</th>
                                            <th>Highest Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((workout) =>
                                            workout.movements.map((logged) => (
                                                <tr key={logged.movement._id}>
                                                    <td>{new Date(workout.date).toLocaleDateString()}</td>
                                                    <td>{workout.workouts.name}</td>
                                                    <td>{logged.movement.name}</td>
                                                    <td>{logged.sets}</td>
                                                    <td>{logged.metricValue}</td>
                                                    <td>{logged.highestData || "N/A"}</td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Workout Name</th>
                                            <th>Movements</th>
                                            <th>Total Duration</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((workout) => (
                                            <tr key={workout._id}>
                                                <td>{new Date(workout.date).toLocaleDateString()}</td>
                                                <td>{workout.workouts.name}</td>
                                                <td>{workout.movements.map((logged) => logged.movement.name).join(" | ")}</td>
                                                <td>{workout.totalDuration}</td>
                                                <td>{workout.notes || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                </div>
                <div className="right-side-content">
                    <div className="streaks">
                        <h2>Your Logged Workout Streaks</h2>
                        <p>Longest Streak: {streaks.longest} days</p>
                        <p>Current Streak: {streaks.current} days</p>
                    </div>
                    <div className="highest-data">
                        <h2>Personal Records</h2>
                        <ul>
                            {Object.entries(highestData).map(([name, data]) => (
                                <li key={name}>{name}: {data.value} (on {new Date(data.date).toLocaleDateString()})</li>
                            ))}
                        </ul>
                    </div>
                    <div className="your-goals">
                        <h2>Your Goals</h2>
                        <ul>
                            {goals.map((goal, index) => {
                                const movement = movements.find((m) => m._id === goal.movement); 
                                return (
                                    <li key={index}>
                                        {movement ? movement.name : 'Undefined'}: {goal.goal}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoggedWorkoutAnalytics;
