import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/react.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logofinal from "../../assets/trolley.png";

function Navbar({ cartItemsCount }) {
  const navigate=useNavigate()
  const handleClick = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token")
    navigate("/")

  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link
          to={"/"}
          className="link"
        >
          <img src={logofinal} alt="My Logo" />
        </Link>

      </div>
      <div className="navbar-middle">
        <h3>Husnain's Ecommerce Store</h3>
      </div>
      <div className="navbar-cart">
        <Link
          to="/cart"
          className="link"
        >
          <FaShoppingCart size={24} />

        </Link>
        <span className="navbar-cart-count">{cartItemsCount}</span>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6"
          onClick={handleClick}
        >
          Sign Out
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
