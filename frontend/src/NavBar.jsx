import { NavLink } from "react-router-dom";
import "./navbar.css";
import SpotifyLogin from "./Spotify/SpotifyLogin";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/explore">Explore</NavLink>
        </li>
        <li>
          <NavLink to="/schedule">Schedule</NavLink>
        </li>
        <li>
          <NavLink to="/goals">Goals</NavLink>
        </li>
        <li>
          <NavLink to="/logged-analytics">Your Stats</NavLink>
        </li>
        <li>
          <NavLink to="/find-friend">Search Friends</NavLink>
        </li>
      </ul>
      <SpotifyLogin />
    </nav>
  );
}

export default NavBar;
