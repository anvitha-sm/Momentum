import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Account/Login";
import CreateAccount from "./Account/CreateAccount";
import HomePage from "./HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
