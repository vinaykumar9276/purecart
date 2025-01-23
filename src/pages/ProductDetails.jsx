import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../store/CartProvider";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from route
  const [product, setProduct] = useState(null); // Product state
  const { dispatch } = useCart(); // Cart context for dispatching actions

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Added item to cart");
  };

  // Show a spinner if product is not yet loaded
  if (!product) {
    return (
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );
  }

  const { image, title, price, description, rating } = product;

  return (
    <div className="container ">
      <div className="row  ">
        
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 " key={id}>
          <div className="card single ">
            <img
              src={image}
              className="card-img-top p-4"
              alt={title}
              style={{ height: "250px", objectFit: "contain" }}
            />
            <div className="card-body p-4">
              <h5 className="card-title">{title}</h5>
              <p className="card-text text-success fw-bold">${price}</p>
              <p className="card-des">{description}</p>
              <p className="card-text text-muted small">
                Rating: {rating.rate} ★ ({rating.count} reviews)
              </p>
              <button
                className="btn btn-success"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;