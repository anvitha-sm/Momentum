import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function HomePage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleCreateAccount = () => {
    navigate("/signup");
  };
  return (
    <div className="background">
      <div style={{ marginLeft: "50px" }}>
        <div style={{ maxWidth: "60%" }}>
          <p className="titleFont">
            Build Strength, <br />
            Build Routine.
          </p>
          <p className="description">
            Momentum is committed to the idea that a healthy body makes a
            healthy mind. It’s hard to create a balanced workout schedule and
            commit to it in today’s busy society, so we make it easier by
            encouraging you to stick to your schedules and display your
            progress.
          </p>
          <div className="homepage-buttons">
            <button onClick={handleCreateAccount}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
