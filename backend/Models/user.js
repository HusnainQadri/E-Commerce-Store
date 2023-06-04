const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    id: Number,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const { Schema } = mongoose;

// const userSchema = new Schema({
//     id: {
//         type: Number,
//         unique: true
//     },
//     username: String,
//     email: String,
//     password: String
// });

// userSchema.plugin(autoIncrement.plugin, {
//     model: 'User',
//     field: 'id',
//     startAt: 1
// });

// module.exports = mongoose.model('User', userSchema);
