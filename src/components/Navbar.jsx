import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartProvider'; // Import the cart context

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { state } = useCart(); // Access the cart state from context
  const { cart } = state;

  // Calculate the total count of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchInput}`); // Navigate to the Search page with query
  };

  return (
    <nav className="navbar navbar-expand-lg border p-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <strong className='purecart'  >
            Pure Cart
          </strong>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor04"
          aria-controls="navbarColor04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor04">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link active fs-5 " to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fs-5" to="/shop">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fs-5" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fs-5" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link position-relative" to="/cart">
                
                <i
                  className="bi bi-cart-plus-fill"
                  style={{ fontSize: '1.5rem' }}
                >{cartItemCount > 0 && (
                  <span
                    className="badge  text-dark rounded-circle position-absolute"
                    style={{
                      fontSize: '0.8rem', // Smaller text size for better appearance
                      top: '0', // Positions the badge above the cart icon
                      right: '0px',
                      left: '1px' // Slightly to the right of the icon
                    }}
                  >
                    {cartItemCount}
                  </span>
                )}</i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;