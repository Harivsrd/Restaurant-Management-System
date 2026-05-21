import { useEffect, useState } from "react"
import API from "../services/api";
import "../styles/menu.css";

function Menu() {

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


    return (
        <div className="menu-container">
            <h1>Restaurant Menu</h1>

            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div className="menu-card" key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <h3>₹{item.price}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menu;