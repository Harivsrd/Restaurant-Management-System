import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({});

    useEffect(()=>{
        fetchDashboardStats();
    },[]);

    const fetchDashboardStats = async () => {
        try {
            const response = await API.get("orders.dashboard/");

            setStats(response.data);
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>Total Orders</h2>
                    <p>{stats.total_orders}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Total Reservations</h2>
                    <p>{stats.total_reservations}</p>
                </div>
                <div className="dashboard-cart">
                    <h2>Total Users</h2>
                    <p>{stats.total_users}</p>
                </div>
                <div className="dashboard-card">
                    <h2>Total Revenue</h2>
                    <p>₹{stats.total_revenue}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;