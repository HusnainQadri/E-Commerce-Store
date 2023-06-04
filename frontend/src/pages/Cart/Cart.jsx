import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart, resetCart } from "../../redux/actions";
import { addToCart_helper } from "../../helper"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function CartItem() {
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  const dispatch = useDispatch();
  const removeItemFromCart = (id) => {
    return () => {
      dispatch(removeFromCart(id));
    };

  }
  const navigate=useNavigate();
  const handleReset = () => {
    const data = async () => {
      //get id from the local storage
      const id = localStorage.getItem("userid");


      //get current date
      const date = new Date();
      const year = date.getFullYear();
      const resp = await addToCart_helper(id, year, cart);
      if (resp){
        dispatch(resetCart());
        navigate("/home")
      }
      //  const cart = addToCart();
    }
    data()
    };
    return (
      <>
        <Navbar cartItemsCount={cart.length} />
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-10">
            <div className="cart-page">
              {cart.length === 0 ? (
                <div className="empty-cart flex flex-col items-center justify-center space-y-2">
                  <FaShoppingCart className="h-16 w-16 text-gray-400" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Your cart is empty
                  </h2>
                  <p className="text-sm text-gray-600">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                </div>
              ) : (
                <div className="cart-items">
                  <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Your Cart
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Cart
                      </h3>
                      <ul className="space-y-4">
                        {cart.map((item) => (
                          <li
                            key={item.product.id}
                            className="flex items-center space-x-4"
                          >
                            <img
                              className="h-16 w-16 object-cover rounded"
                              src={item.product.image}
                              alt={item.product.title}
                            />
                            <div className="flex-1">
                              <h3 className="text-gray-900 font-medium">
                                {item.product.title}
                              </h3>
                              <p className="text-gray-600">
                                Quantity: {item.quantity}
                              </p>
                              <p className="text-gray-600">
                                Price: ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md text-base font-medium"
                              onClick={removeItemFromCart(item.product.id)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Order Summary
                      </h3>
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Items: {cart.length}
                        </p>
                        <p className="text-gray-600">
                          Total Price: ${totalPrice.toFixed(2)}
                        </p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-2 rounded-md text-sm font-medium"
                          onClick={handleReset}
                        >
                          Checkout
                        </button>
                        <Link to="/">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-2 rounded-md text-sm font-medium ml-1" >
                            Continue Shopping
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
 
}
