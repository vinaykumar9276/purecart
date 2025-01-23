import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../store/CartProvider'; // Assuming you're using a cart context
import { toast } from 'react-toastify';

const Search = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [searchParams] = useSearchParams(); // Get query parameters
  const { dispatch } = useCart(); // Using cart context

  const query = searchParams.get('query') || ''; // Get the search query

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products when the query or products change
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [query, products]);

  // Add to cart handler
  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('Added item to cart');
  };

  return (
    <div className="container">
      <h4>Search Results for "{query}"</h4>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const { id, image, title, price, description, rating } = product;
            return (
              <div className="col-12 col-sm-12 col-md-3 col-lg-3" key={id}>
                <div className="card h-100">
                  <img
                    src={image}
                    className="card-img-top p-3"
                    alt={title}
                    style={{ height: '250px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-success fw-bold">${price}</p>
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
            );
          })
        ) : (
          <div className="col-12">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;