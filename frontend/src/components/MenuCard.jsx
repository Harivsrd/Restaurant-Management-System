import "../styles/menucard.css";

function MenuCard({ item }) {
    return (
        <div className="menu-card">
            <img 
            src="https://images.unsplash.com/photo-1563379091339-03246963d51a" 
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