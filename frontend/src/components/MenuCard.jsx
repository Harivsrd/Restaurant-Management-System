import "../styles/menucard.css";

function MenuCard({ item, addToCart }) {
    return (
        <div className="menu-card">
            <img 
            src={`http://127.0.0.1:8000${item.image}`}
            alt={item.name} 
            />

            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <h3>₹{item.price}</h3>

            <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
    );
}

export default MenuCard;