import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./accounts.css";
import { signInApi } from "../api/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSetUsername = (event) => setUsername(event.target.value);
  const handleSetPassword = (event) => setPassword(event.target.value);

  const login = async () => {
    const data = { user: String(username), password: String(password) };

    try {
      const res = await signInApi(data);
      if (res) {
        localStorage.setItem("token", JSON.stringify(res.token));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button onClick={login} className="button">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="button mainFont"
            >
              Don&apos;t have an account? Sign up
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
