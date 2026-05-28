import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Modern E-Commerce Platform
        </h1>

        <p>
          Build scalable shopping experiences
          using React, TypeScript and Golang APIs.
        </p>

        <div className="hero-buttons">
    <Link to="/products">
          <button className="primary-btn">
            Explore Products
          </button>
            </Link> 
        <Link to="/admin/dashboard">
          <button className="secondary-btn">
            Admin Dashboard
          </button>
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Hero;