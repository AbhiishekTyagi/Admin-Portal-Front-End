import { NavLink } from "react-router-dom";
import "../Components/Navbar.css";
import { useAuth } from "../Store/auth";

function Navbar()
{
  const {isLoggedIn}=useAuth();
  console.log("Navbar isLoggedIn:", isLoggedIn);
   return(
     <>
     <div className="container">
      <div className="logo-brand">
        <a href="/">MERN PROJECT</a>
      </div>
      <nav>
        <ul>
            <li><NavLink to="/">Home</NavLink> </li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/service">Service</NavLink></li>
            {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
        </ul>
      </nav>
     </div>
     </>
  )
}
export default Navbar;