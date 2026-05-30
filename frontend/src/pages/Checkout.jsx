import { toast } from "react-toastify"
import { Navigate } from "react-router-dom";
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
        toast.error("Check the cart, the cart is empty!");
        return;
      }
      
      const response = await API.post(
        "orders/create/",
        {
          total_price: totalPrice
        }
      );

      console.log(response.data);

      toast.success("Order Placed Successfully");

      setCartItems([]);

    } catch (error) {

      console.log(error);

    }

  };

  const handlePayment = async () => {
    const response = await API.post("orders/create-payment/",{
      amount: totalPrice
    });

    const options = {
      key : "rzp_test_SvHVh5vvELekxH",
      amount: response.data.amount,
      currency: response.data.currency,
      order_id: response.data.id,
      name: "Restaurant Management",
      description: "Food Order",
      handler: async function(response) {
        try {

            await API.post(
              "orders/verify-payment/",
              {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id
              }
            );

            toast.success(
              "Payment Successful"
            );
            setCartItems([]);
            <Navigate to="/orders" />

        } catch(error) {

            console.log(error);
        }
      }
    }

    const razor = new window.Razorpay(options);

    razor.open();
  }

  return (

    <div>

      <h1>Checkout</h1>

      <h2>Total: ₹{totalPrice}</h2>

      <button onClick={handlePayment}>
        Place Now
      </button>

    </div>
  );
}

export default Checkout;