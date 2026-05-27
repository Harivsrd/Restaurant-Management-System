import "../styles/menucard.css";
import API from "../services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function MenuCard({ item, addToCart }) {

    const [ rating, setRating ] = useState("");

    const [comment , setComment] = useState("");

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    },[])

    const handleFavorite = async () => {

    try {

        const response = await API.post(`menu/favorite/${item.id}/`);

        toast.success(response.data.message);
    } catch (error) {

        toast.error("Login required");

    }
    };

    const submitReview = async () => {
        try {
            await API.post(`menu/review/${item.id}/`,{rating,comment,});
            toast.success("Review Added");
        }
        catch(error) {
            toast.error("Review Failed");
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await API.get(`menu/reviews/${item.id}/`);
            setReviews(response.data);
        }
        catch(error) {
            console.log(error);
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
            <div className="review-section">
                <input type="number" placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(e.target.value)} />
                <textarea placeholder="Write review" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button onClick={submitReview}> Submit Review</button>
            </div>
            <div className="reviews-list">
                {
                    reviews.map((review) => (
                        <div key={review.id}>
                            <h4>{review.username}</h4>
                            <p>⭐ {review.rating}</p>
                            <p>{review.rating}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
    );
}

export default MenuCard;