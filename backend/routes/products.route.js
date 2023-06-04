const express = require('express');
const router = express.Router();
const Product = require('../Models/product');
const {requireAuth} =require("../middleware/auth")
const { getAllProducts, getProductById,
  searchProductsByTitle, getProduct, updateProduct} = require('../controllers/productController');

// Get all products
router.get('/',requireAuth, getAllProducts);

// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// Get a single product
router.get('/:id', requireAuth,getProductById);

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findOne({ id : id });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// Search Product
router.get('/title/search',requireAuth, searchProductsByTitle);

// router.get('/title/search', async (req, res) => {
//   try {
//     const { q } = req.body;
//     const products = await Product.find({ title: { $regex: q, $options: 'i' } });
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Limit results
router.get('/limit/:num', requireAuth,async (req, res) => {
  try {
    const { num } = req.params;
    const products = await Product.find().limit(Number(num));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sort results
router.get('/sort/:field',requireAuth, async (req, res) => {
  try {
    const { field } = req.params;
    const products = await Product.find().sort({ [field]: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories
router.get('/categories/all',requireAuth, async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get products in category
router.get('/categories/:category',requireAuth, async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new product
router.post('/', requireAuth,async (req, res) => {
  const product = new Product({
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.patch('/:id',requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.id != null) {
      product.id = req.body.id;
    }
    if (req.body.title != null) {
      product.title = req.body.title;
    }
    if (req.body.price != null) {
      product.price = req.body.price;
    }
    if (req.body.description != null) {
      product.description = req.body.description;
    }
    if (req.body.category != null) {
      product.category = req.body.category;
    }
    if (req.body.image != null) {
      product.image = req.body.image;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a product
// router.put('/:id', updateProduct);
  
// Delete a product
router.delete('/:id',requireAuth, async (req, res) => {
  try {
      const { id } = req.params;
      const product = await Product.findOne({ id : id });
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      // await product.remove();
      await product.deleteOne({ id : id });
      res.json({ message: 'Product deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;