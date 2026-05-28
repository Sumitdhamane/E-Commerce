import { Link }
from "react-router-dom";

import { useCart }
from "../../context/CartContext";

import { useAuth }
from "../../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {

  const { cartItems } = useCart();
  const {
  token,
  logout,
} = useAuth();

  return (

    <nav className="navbar">

      <div className="logo">
        ShopX
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/products">
            Products
          </Link>
        </li>

        <li>
          <Link to="/orders">
            Orders
          </Link>
        </li>

        <li>
          <Link to="/cart">
            Cart ({cartItems.length})
          </Link>
        </li>

        {token ? (

  <li>

    <button
      onClick={logout}

      className="
        text-white
        hover:text-violet-400
      "
    >
      Logout
    </button>

  </li>

) : (

  <li>

    <Link to="/login">
      Login
    </Link>

  </li>

)}

      </ul>

    </nav>

  );
};

export default Navbar;