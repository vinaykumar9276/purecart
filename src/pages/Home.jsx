import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos"; // Import AOS for animations
import "aos/dist/aos.css"; // AOS styles
import { FaShippingFast, FaRegSmile, FaMoneyCheckAlt } from "react-icons/fa";

const Home = () => {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Testimonials data
  const reviews = [
    {
      text: '"Mana Trendz has the best collection of outfits. I love their quality and customer service!"',
      author: "Jane Doe",
    },
    {
      text: '"Amazing gadgets at great prices! Highly recommended."',
      author: "John Smith",
    },
    {
      text: '"The home decor items are simply beautiful! They really bring style and comfort to my home."',
      author: "Mary Johnson",
    },
    {
      text: '"I bought a gift for my wife, and she absolutely loved it! Great quality jewelry!"',
      author: "Robert Brown",
    },
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [topPicks, setTopPicks] = useState([]);
  const [currentTopPickIndex, setCurrentTopPickIndex] = useState(0);

  // Fetch top picks from FakeStoreAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setTopPicks(data); // Store fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Update testimonial review every 2 seconds
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 2000);
    return () => clearInterval(reviewInterval);
  }, [reviews.length]);

  // Cycle through top picks every 2 seconds
  useEffect(() => {
    const topPickInterval = setInterval(() => {
      setCurrentTopPickIndex((prevIndex) => (prevIndex + 5) % topPicks.length);
    }, 2000);
    return () => clearInterval(topPickInterval);
  }, [topPicks.length]);

  const visibleTopPicks = topPicks.slice(
    currentTopPickIndex,
    currentTopPickIndex + 5
  );

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section text-center py-5 d-flex align-items-center justify-content-center container-fluid"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
          color: "white",
          width: "100%",
          borderRadius: "30px",
          overflow: "hidden",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div
          className="content"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
            textAlign: "center",
          }}
          data-aos="fade-up"
        >
          <h1 className="display-4 fw-bold">Welcome to Pure Cart</h1>
          <p className="lead">
          At PureCart, we believe shopping for clothes should be effortless and exciting. 
          That’s why we’ve curated a collection of trendy, high-quality apparel for every occasion.
          </p>
          <NavLink to="/shop" className="btn btn-primary btn-lg mt-3">
            Explore Now
          </NavLink>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Our Featured Categories</h2>
          <div className="row justify-content-center">
            <div
              className="col-md-4 col-sm-6 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div
                className="card shadow h-100 category-card"
                style={{ overflow: "hidden", borderRadius: "15px" }}
              >
                <img
                  src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="card-img-top"
                  alt="Fashion"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Fashion</h5>
                  <p className="card-text">
                    Explore trendy outfits and accessories.
                  </p>
                  <NavLink to="/shop" className="btn btn-outline-primary">
                    Shop Now
                  </NavLink>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 col-sm-6 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div
                className="card shadow h-100 category-card"
                style={{ overflow: "hidden", borderRadius: "15px" }}
              >
                <img
                  src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="card-img-top"
                  alt="Electronics"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Electronics</h5>
                  <p className="card-text">
                    Discover the latest gadgets and devices.
                  </p>
                  <NavLink to="/shop" className="btn btn-outline-primary">
                    Shop Now
                  </NavLink>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 col-sm-6 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div
                className="card shadow h-100 category-card"
                style={{ overflow: "hidden", borderRadius: "15px" }}
              >
                <img
                  src="data:image/jpeg;base64,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"
                  className="card-img-top"
                  alt="Jewellery"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Jewellery</h5>
                  <p className="card-text">
                    Find beautiful Jewellery for someone.
                  </p>
                  <div className="justify-content-center mt-auto"> 
                  <NavLink to="/shop" className="btn btn-outline-primary">
                    Shop Now
                  </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Cards Section */}
      <section className="scrolling-cards-section py-5 bg-secondary-subtle">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Top Picks for You</h2>
          <div
            className="d-flex justify-content-center gap-4"
            data-aos="fade-right"
          >
            {visibleTopPicks.map((product) => (
              <div
                key={product.id}
                className="card shadow bg-light"
                style={{
                  width: "200px",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div
                  className="card-body d-flex flex-column justify-content-between"
                  style={{ height: "200px" }}
                >
                  <div>
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                  </div>
                  <div className="d-flex justify-content-center mt-auto">
                    <button className="btn btn-outline-success btn-sm">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4 text-center" data-aos="fade-up">
              <FaShippingFast size={50} className="mb-3 text-primary" />
              <h5>Fast Shipping</h5>
              <p>Get your products delivered in record time.</p>
            </div>
            <div
              className="col-md-4 text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaRegSmile size={50} className="mb-3 text-success" />
              <h5>Customer Satisfaction</h5>
              <p>We prioritize your happiness and satisfaction.</p>
            </div>
            <div
              className="col-md-4 text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaMoneyCheckAlt size={50} className="mb-3 text-danger" />
              <h5>Secure Payments</h5>
              <p>Safe and reliable payment options available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

    </>
  );
};

export default Home;