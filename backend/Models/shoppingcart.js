const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    id: Number,
    userId: Number,
    date: Date,
    products: [
      {
        id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        quantity: Number
      }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);