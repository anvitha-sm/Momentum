import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Account/Login";
import CreateAccount from "./Account/CreateAccount";
import HomePage from "./HomePage";
import CreateWorkout from "./Workout/CreateWorkout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/createworkout" element={<CreateWorkout />} />
    </Routes>
  );
}

export default App;
