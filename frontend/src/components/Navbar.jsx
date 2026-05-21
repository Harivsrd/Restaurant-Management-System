import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Restaurant App</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/about">About</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    )
}

export default Navbar;