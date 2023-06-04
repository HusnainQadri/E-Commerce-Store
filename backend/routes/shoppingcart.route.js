const express = require('express');
const router = express.Router();
const ShoppingCart = require('../Models/shoppingcart');
const {requireAuth} =require("../middleware/auth")
// GET all shopping carts
router.get('/',requireAuth, async (req, res) => {
  try {
    const shoppingCarts = await ShoppingCart.find();
    res.json(shoppingCarts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single shopping cart by id
router.get('/:id', requireAuth,getShoppingCart, (req, res) => {
  res.json(res.shoppingCart);
});

// GET shopping carts within a date range
router.get('/date/:from/:to', requireAuth,async (req, res) => {
  try {
    const shoppingCarts = await ShoppingCart.find({
      date: {
        $gte: new Date(req.params.from),
        $lte: new Date(req.params.to)
      }
    });
    res.json(shoppingCarts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Sample Input: http://localhost:3000/api/shoppingcart/date/2019-01-01/2022-12-31

// GET shopping carts for a specific user
router.get('/user/:userId',requireAuth, async (req, res) => {
  try {
    const shoppingCarts = await ShoppingCart.find({ userId: req.params.userId });
    res.json(shoppingCarts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new shopping cart
router.post('/',requireAuth, async (req, res) => {
  console.log("here")
  
  const lastId = await ShoppingCart.findOne().sort({id:-1})
  let newId = 0
  if(lastId){
      newId = lastId.id
  }
  newId++
  console.log("herer")
  const shoppingCart = new ShoppingCart({
    id: newId,
    userId: req.body.userId,
    date: req.body.date,
    products: req.body.products
  });
  console.log("here")
  try {
    const newShoppingCart = await shoppingCart.save();
    res.status(201).json(newShoppingCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log("herer")
});

// PATCH/UPDATE an existing shopping cart by id
router.patch('/:id',requireAuth, getShoppingCart, async (req, res) => {
  if (req.body.id != null) {
    res.shoppingCart.id = req.body.id;
  }
  if (req.body.userId != null) {
    res.shoppingCart.userId = req.body.userId;
  }
  if (req.body.date != null) {
    res.shoppingCart.date = req.body.date;
  }
  if (req.body.products != null) {
    res.shoppingCart.products = req.body.products;
  }

  try {
    const updatedShoppingCart = await res.shoppingCart.save();
    res.json(updatedShoppingCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a shopping cart by id
router.delete('/:id',requireAuth, getShoppingCart, async (req, res) => {
  try {
    await res.shoppingCart.deleteOne({ id : req.params.id });
    res.json({ message: 'Shopping cart has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MIDDLEWARE: get a shopping cart by id
async function getShoppingCart(req, res, next) {
  let shoppingCart;
  try {
    const { id } = req.params;
    shoppingCart = await ShoppingCart.findOne({ id : id });
    if (shoppingCart == null) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.shoppingCart = shoppingCart;
  next();
}

module.exports = router;