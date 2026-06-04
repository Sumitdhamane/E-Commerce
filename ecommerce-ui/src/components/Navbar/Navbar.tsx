import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();

  const { token, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">ShopX</Link>
      </div>

      {/* Navigation */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>

        <li>
          <Link to="/cart">Cart ({cartItems.length})</Link>
        </li>

        {token ? (
          <li>
            <button
              onClick={logout}
              className="
                logout-btn
              "
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link
                to="/signup"
                className="
                  signup-btn
                "
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
