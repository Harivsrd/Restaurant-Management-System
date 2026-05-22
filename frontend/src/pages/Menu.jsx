import { useEffect, useState } from "react"
import API from "../services/api";
import "../styles/menu.css";
import MenuCard from "../components/MenuCard";

function Menu({ cartItems, setCartItems }) {

    const [menuItems, setMenuItems] = useState([]);
    
    const fetchMenu = async () => {
        try {
            const response = await API.get("menu/");
            setMenuItems(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    }


    return (
        <div className="menu-container">
            <h1>Restaurant Menu</h1>

            <div className="menu-grid">
                {menuItems.map((item) => (
                    <MenuCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    )
}

export default Menu;