import { useEffect, useState } from "react"
import API from "../services/api";
import "../styles/orderhistory.css";

function OrderHistory() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await API.get("orders/history/");
            setOrders(response.data);
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="orders-container">
            <h1>Order History</h1>
            {
                orders.length === 0 
                ? (
                    <p>No orders found</p>
                )
                : (
                    orders.map((order) => (
                        <div className="order-card" key={order.id}>
                            <h2>Order #{order.id}</h2>
                            <p>
                                Total: ₹{order.total_price}
                            </p>
                            <p>
                                Date:{" "}{new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default OrderHistory;