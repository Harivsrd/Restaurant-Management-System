import "../styles/menucard.css";

function MenuCard({ item }) {
    return (
        <div className="menu-card">
            <img 
            src="/biryani.webp" 
            alt={item.name} 
            />

            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>₹{item.price}</h3>

            <button>Add to Cart</button>
        </div>
    );
}

export default MenuCard;