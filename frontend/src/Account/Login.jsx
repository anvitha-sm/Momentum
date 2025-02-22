import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { router } from './user.js'
import "./accounts.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSetUsername = (event) => setUsername(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);

  function login() {
    const data = { username: String(username), password: String(password) };
    router.post(data);
    navigate("/");
  }

  return (
    <div>
      <div className="center-container">
        <div className="rectangle">
          <h1 className="mainFont lightFont form-group">Welcome Back</h1>
          <div className="form-group">
            <label htmlFor="email" className="mainFont">
              Username/Email
            </label>
            <input
              type="text"
              id="email"
              onChange={handleSetUsername}
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
          <button onClick={login} className="button">
            Login
          </button>
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
