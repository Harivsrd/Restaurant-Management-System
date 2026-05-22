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
        const existingItem = cartItems.find(
            (cartItem) => cartItem.id === item.id
        );

        if(existingItem) {
            const updatedCart = cartItems.map((cartItem)=> 
                cartItem.id === item.id 
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
            );

            setCartItems(updatedCart);
        }
        else {
            setCartItems([
                ...cartItems, {...item, quantity: 1}
            ]);
        }
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