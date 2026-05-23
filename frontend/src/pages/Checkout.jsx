import API from "../services/api";

function Checkout({ cartItems, setCartItems }) {

  const totalPrice = cartItems.reduce(

    (total, item) =>
      total + item.price * item.quantity,

    0
  );

  const placeOrder = async () => {

    try {

      if (totalPrice <= 0 ){
        alert("Check the cart, the cart is empty!");
        return;
      }

      const response = await API.post(
        "orders/create/",
        {
          total_price: totalPrice
        }
      );

      console.log(response.data);

      alert("Order Placed Successfully");

      setCartItems([]);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1>Checkout</h1>

      <h2>Total: ₹{totalPrice}</h2>

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>
  );
}

export default Checkout;