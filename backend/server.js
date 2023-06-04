// MongoDB connection
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ecommercestore", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mongoose models

const Product = require("./Models/product")
const User = require("./Models/user")
const Cart = require("./Models/shoppingcart")

const axios = require('axios');

// Fetch and save all products to MongoDB
async function getProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;
    await Product.deleteMany();
    await Product.insertMany(products);
  } catch (error) {
    console.error(error);
  }
}
getProducts();

// Fetch and save shopping cart to MongoDB
async function getShoppingCart() {
 try {
    const response = await axios.get('https://fakestoreapi.com/carts/1');
    const cart = response.data;
    await Cart.deleteMany();
    await Cart.create({
      id: cart.id,
      userId: cart.userId,
      date: cart.date,
      products: cart.products
    });
  } catch (error) {
    console.error(error);
  }
}
getShoppingCart();

// Fetch and save all users to MongoDB
async function getUsers() {
try {
    const response = await axios.get('https://fakestoreapi.com/users');
    const users = response.data;
    await User.deleteMany();
    await User.insertMany(users);
  } catch (error) {
    console.error(error);
  }
}
getUsers();