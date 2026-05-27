import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";

function PopularItems() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchPopularItems();
    },[]);

    const fetchPopularItems = async () => {
        try {
            const response = await API.get("menu/popular/");
            setItems(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Most Popular Foods</h1>
            <div className="menu-grid">
                {
                    items.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )

}

export default PopularItems;