import "../styles/menucard.css";
import API from "../services/api";
import { toast } from "react-toastify";

function MenuCard({ item, addToCart }) {

    const handleFavorite = async () => {

    try {

        const response = await API.post(`menu/favorite/${item.id}/`);

        toast.success(response.data.message);
    } catch (error) {

        toast.error("Login required");

    }
    };

    return (
        <div className="menu-card">
            <img 
            src={`http://127.0.0.1:8000${item.image}`}
            alt={item.name} 
            />

            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>₹{item.price}</h3>
            <button onClick={handleFavorite}>
            ❤️ Favorite
            </button>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
    );
}

export default MenuCard;