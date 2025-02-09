import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accounts.css";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSetUsername = (event) => setUsername(event.target.value);
  const handleSetEmail = (event) => setEmail(event.target.value);
  const handleSetName = (event) => setName(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);
  const handleSetConfirmPassword = (event) =>
    setConfirmPassword(event.target.value);

  function createAccount() {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = {
      username: String(username),
      email: String(email),
      name: String(name),
      password: String(password),
    };

    // API call for account creation
    console.log("Account creation data:", data);
    navigate("/");
  }

  return (
    <div>
      <div className="center-container">
        <div className="rectangle">
          <h1 className="mainFont lightFont form-group">Create Account</h1>
          <div className="form-group">
            <label htmlFor="username" className="mainFont">
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={handleSetUsername}
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="mainFont">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleSetEmail}
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="mainFont">
              Name
            </label>
            <input
              type="name"
              id="name"
              onChange={handleSetName}
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="mainFont">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleSetPassword}
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="mainFont">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={handleSetConfirmPassword}
              className="input"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button onClick={createAccount} className="button">
              Create Account
            </button>
            <button
              onClick={() => navigate("/login")}
              className="button mainFont"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      ></div>
    </div>
  );
}
