function Cart({ cartItems, setCartItems }){
    const removeItem = (index) => {
        const updatedCart = [...cartItems];

        updatedCart.splice(index , 1);

        setCartItems(updatedCart);
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {
                cartItems.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index}>
                            <h2>{item.name}</h2>
                            <p>₹{item.price}</p>
                            <button onClick={() => removeItem(index)}>
                                Remove
                            </button>
                        </div>   
                    ))
                )
            }
        </div>
    )
}

export default Cart;