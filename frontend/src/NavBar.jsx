import { NavLink } from "react-router-dom";
import "./navbar.css";

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
      </ul>
    </nav>
  );
}

export default NavBar;
