const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String
});

module.exports = mongoose.model('Product', productSchema);