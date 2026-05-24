import { useEffect, useState } from "react"
import API from "../services/api";
import "../styles/menu.css";
import MenuCard from "../components/MenuCard";

function Menu({ cartItems, setCartItems }) {

    const [menuItems, setMenuItems] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

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

    const filteredItems = menuItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === "All" || 
        item.category === selectedCategory;

        return (
            matchesSearch && matchesCategory
        );
    });

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

            <div className="menu-controls">

                <input type="text" placeholder="Search food..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >

                    <option value="All">All</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>

                </select>

            </div>

            <h1>Restaurant Menu</h1>

            <div className="menu-grid">
                {filteredItems.map((item) => (
                    <MenuCard key={item.id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    )
}

export default Menu;