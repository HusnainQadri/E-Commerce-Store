import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';
import { toast } from 'react-toastify';
import "./Card.css";
function Card({ product }) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        console.log(`Added ${quantity} ${product.title} to cart`);
        if (parseInt(quantity)>0 && parseInt(quantity)<=product.id) {
            dispatch(addToCart(product, quantity));
        }
        else {
            toast.error('Can not set the value of the product to be zero or less than stock value!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }

    };

    const handleQuantityChange = (event) => {
        if (parseInt(event.target.value)<=0) {
            toast.error('Value must be greater than zero', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
        }
        else
            setQuantity(parseInt(event.target.value));
    };

    return (
        <div className="card">
           
                <img src={product.image} alt={product.name} />
                <Link 
                to={`/details/${product.id}`}
                className="link"    
            >
                <h2>{product.title}</h2>
                </Link>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="quantity">
                    <label htmlFor="quantity">Stock:  {product.id}</label>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
                <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                </button>
         

        </div>
    );
}

export default Card;
