import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export const NavigationBar = () => {
    const navigate = useNavigate();
    return(
        <nav>
            <div className="list">
            <button className="link" onClick={navigate("/HomePage")}> Home </button>
            <button className="link" onClick={navigate("/login")}> Log In </button>
            <button className="link" onClick={navigate("/workout")}> Workouts </button>
            <button className="link" onClick={navigate("/account")}> My Account </button>
            </div>
        </nav>
    );
};