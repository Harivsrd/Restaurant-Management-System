import "../styles/cart.css";
import { Link } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {

  const increaseQuantity = (id) => {

    const updatedCart = cartItems.map((item) =>

      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);

  };

  const decreaseQuantity = (id) => {

    const updatedCart = cartItems
      .map((item) =>

        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);

  };

  const totalPrice = cartItems.reduce(

    (total, item) =>
      total + item.price * item.quantity,

    0
  );

  return (

    <div className="cart-container">

      <h1>Your Cart</h1>

      {

        cartItems.length === 0 ? (

          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>
              Add delicious food items 
              to your cart.
            </p>
          </div>

        ) : (

          <>
            {

              cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div>

                    <h2>{item.name}</h2>

                    <p>₹{item.price}</p>

                  </div>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>
              ))
            }

            <h2 className="total">
              Total: ₹{totalPrice}
            </h2>

            <Link to="/checkout">
                <button>
                    Proceed to Checkout
                </button>
            </Link>

          </>
        )
      }

    </div>
  );
}

export default Cart;