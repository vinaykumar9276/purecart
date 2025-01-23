import React from "react";
import { useCart } from "../store/CartProvider";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { useNavigate } from "react-router-dom"; // For navigation after checkout

const Cart = () => {
  const { state, dispatch } = useCart();
  const { cart } = state;
  const navigate = useNavigate();

  // Function for Handling Increment
  function handleIncrement(productId) {
    dispatch({ type: "INCREMENT", payload: { id: productId } });
    toast.success("Incremented item in cart");
  }

  // Function for Handling Decrement
  function handleDecrement(productId) {
    const item = cart.find((product) => product.id === productId);
    if (item.quantity > 1) {
      dispatch({ type: "DECREMENT", payload: { id: productId } });
      toast.success("Decremented item in cart");
    } else {
      toast.warn("Quantity cannot be less than 1");
    }
  }

  // Function for Handling Remove
  function handleRemove(productId) {
    dispatch({ type: "REMOVE_ITEM_IN_CART", payload: { id: productId } });
    toast.success("Removed item from cart");
  }

  // Calculate Total Price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function for Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Example: Navigate to a confirmation page or payment process
    navigate("/checkout-summary", { state: { total: calculateTotal(), cart } });
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="container">
      <div className="row">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="col-12 col-sm-12 col-md-3 col-lg-3" key={item.id}>
              <div className="card shadow p-3">
                <img
                  src={item.image}
                  className="card-img-top product-img"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: ${item.price * item.quantity}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-outline-success mx-3"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-warning mx-3"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-outline-danger mx-3"
                    onClick={() => handleRemove(item.id)}
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Cart Is Empty</h1>
        )}
      </div>
      {cart.length > 0 && (
        <div className="checkout-section mt-4 text-center">
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <div className="p-2">
          <button className="btn btn-success p-3 m-3 " onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;