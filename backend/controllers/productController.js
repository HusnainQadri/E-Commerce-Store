const Product = require('../Models/product');
const asyncHandler = require('express-async-handler');

// Middleware function to get a product by ID
async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id : id });    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // res.product = product;
    // next();
    const data = {
        product: product,
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateProduct = asyncHandler(async(req,res) => {
    const {id,name,price,description,category,image} = req.body
    const product = await Product.findByIdAndUpdate(id,{
        name,
        price,
        description,
        category,
        image
    })
    const data = {
        status: 200,
        product: product
    }
    res.status(200).json(data)
})

//=======================================================

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function searchProductsByTitle(req, res) {
  try {
    const { q } = req.query;
    const products = await Product.find({ title: { $regex: q, $options: 'i' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAllProducts, getProductById,
  searchProductsByTitle, getProduct, updateProduct };
