import { useEffect, useState } from "react"
import API from "../services/api";
import "../styles/menu.css";
import MenuCard from "../components/MenuCard";

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
                    <MenuCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Menu;