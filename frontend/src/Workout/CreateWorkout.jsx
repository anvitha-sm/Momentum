import React, { useState } from "react";
import { router } from './workouts.js';
import "./CreateWorkout.css";
const express = require("express");
const Workout = require("../models/Workout");
const User = require("../models/User");
const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [bodyRegion, setBodyRegion] = useState("Upper Body");
  const [currentWorkout, setCurrentWorkout] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // these are temporary images as a placeholder until we have movement components
  const movements = [
    { name: "Squat", image: "https://static.independent.co.uk/2024/09/03/13/how-to-perform-a-barbell-squat-correctly.jpg?width=1200&height=1200&fit=crop" },
    { name: "Leg Press", image: "https://squatwolf.com/cdn/shop/articles/shutterstock_215163556-min.jpg?v=1719993920" },
    { name: "Lunges", image: "https://images.ctfassets.net/hjcv6wdwxsdz/2bQRCnH8foEemorHTvK44n/be6097a413f930f637e3dd3bf905ce6f/lunge.png" },
  ];
  const saveWorkout = (currentWorkout) =>{
    router.post(currentWorkout);
  }
  const addToWorkout = (movement) => {
    if (!currentWorkout.includes(movement)) {
      setCurrentWorkout((prev) => [...prev, movement]);
    }
  };

  // Filter movements based on the search query (case-insensitive)
  const filteredMovements = movements.filter((movement) =>
    movement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="create-workout-page">
      {/* Top Header */}
      <header className="header">
        <div className="header-left">Create Workout</div>
        <div className="header-right">Account</div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Side */}
        <section className="left-content">
          <div className="input-row">
            <div className="label-input-pair">
              <label htmlFor="workoutName">Name:</label>
              <input
                id="workoutName"
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Enter workout name"
              />
            </div>
            <div className="label-input-pair">
              <label htmlFor="bodyRegion">Body Region:</label>
              <select
                id="bodyRegion"
                value={bodyRegion}
                onChange={(e) => setBodyRegion(e.target.value)}
              >
                <option>Upper Body</option>
                <option>Lower Body</option>
                <option>Full Body</option>
              </select>
            </div>
          </div>

          <h2 className="section-title">Add Movement</h2>
          <input
            type="text"
            placeholder="Search for movements..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="movements-list">
            {filteredMovements.map((movement) => (
              <div key={movement.name} className="movement-card">
                <img
                  src={movement.image}
                  alt={movement.name}
                  className="movement-image"
                />
                <p className="movement-name">{movement.name}</p>
                <button
                  className="add-button"
                  onClick={() => addToWorkout(movement)}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Side */}
        <section className="right-content">
          <h2 className="section-title">Current Workout</h2>
          <div className="current-workout-list">
            {currentWorkout.map((movement) => (
              <div key={movement.name} className="movement-card">
                <img
                  src={movement.image}
                  alt={movement.name}
                  className="movement-image"
                />
                <p className="movement-name">{movement.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer with Next Button on the Left */}
      <footer className="footer">
        <button className="next-button">Next</button>
      </footer>
      <footer className="footer">
        <button className="save-workout"
          onClick={() => saveWorkout(Workout)}
          > Create Workout </button>
      </footer>
    </div>
  );
};

export default CreateWorkout;
