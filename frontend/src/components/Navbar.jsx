import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ cartItems }) {

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        
        localStorage.removeItem("token");
        window.location.href = "/login";

    }

    return (
        <nav className="navbar">
            <h2>Restaurant App</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/about">About</Link>
                {
                    token ? (
                        <>
                            <Link to="/cart">Cart ({cartItems.length})</Link>
                            <Link to="/orders"> Orders </Link>
                            <Link to="/reservations">Reservations</Link>
                            <Link to="/reservation-history">Reservation History</Link>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/profile">Profile</Link>
                            <button onClick={handleLogout}> Logout </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;