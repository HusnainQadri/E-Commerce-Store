import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {getProductById} from "../../helper";
import {useSelector,useDispatch} from "react-redux";
import "./ProductDetail.css";
import { addToCart } from "../../redux/actions";

const ProductDetail = () => {

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const cart= useSelector((state) => state.cart);
    useEffect(() => {
        //get the id of the product form the url after last /
        const id = window.location.pathname.split("/")[2];
        getProductById(id).then((product) => {
            setProduct(product);
        }
        );
    }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // Add logic to add product to cart
    console.log("Added to cart");
    dispatch(addToCart(product, selectedQuantity));

  };

  return (
    <>
    <Navbar cartItemsCount={cart.length}/>
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-detail-info">
        <h2 className="product-detail-title">{product.title}</h2>
        <p className="product-detail-price">${product.price}</p>
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-color">
          <span>Color:</span>
          <div className="color-options">
            <div
              className={`color-option ${
                selectedColor === "red" ? "selected" : ""
              }`}
              onClick={() => handleColorChange("red")}
            >
              <div class="w-8 h-8 rounded-full bg-red-500 mx-3"></div>
            </div>
            <div
              className={`color-option ${
                selectedColor === "blue" ? "selected" : ""
              }`}
              onClick={() => handleColorChange("blue")}
            >
              <div class="w-8 h-8 rounded-full bg-blue-500 mx-3"></div>
            </div>
            <div
              className={`color-option ${
                selectedColor === "green" ? "selected" : ""
              }`}
              onClick={() => handleColorChange("green")}
            >
              <div class="w-8 h-8 rounded-full bg-green-500 mx-3"></div>

            </div>
          </div>
        </div>
        <div className="product-detail-size">
          <span>Size:</span>
          <select>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        <div className="product-detail-quantity">
          <span>Quantity:</span>
          <input
            type="number"
            min="1"
            max="10"
            value={selectedQuantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button className="product-detail-add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <Link to="/" className="product-detail-back-link">
          &lt;&lt; Back to Products
        </Link>
      </div>
     
    </div>
    <Footer />
    </>
  );
};

export default ProductDetail;
