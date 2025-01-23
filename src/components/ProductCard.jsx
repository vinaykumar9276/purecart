import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/CartProvider";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { id, image, title, price, rating } = product;
  const { rate, count } = rating;

  const cardTitle = title.length <= 51 ? title : `${title.slice(0, 50)}...`;

  const { dispatch } = useCart();

  // Handling Add to Cart
  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Added item to cart!");
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card shadow-sm h-100">
        <Link to={`/shop/${id}`} className="nav-link">
          <img
            src={image}
            className="card-img-top product-img"
            alt={`Image of ${title}`}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{cardTitle}</h5>
            <p className="card-text text-success fw-bold">${price.toFixed(2)}</p>
            <p className="card-text text-muted small">
              Rating: {rate} ★ ({count} reviews)
            </p>
          </div>
        </Link>
        <div className="card-footer bg-transparent border-0">
          <button className="btn btn-outline-success w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;