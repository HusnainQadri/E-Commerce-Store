const express = require('express');
const router = express.Router();
const User = require('../Models/user');
require('dotenv').config();
const jwt=require('jsonwebtoken');

router.post('/',async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user with given username exists in the database
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Check if the password matches the hashed password in the database
    var isMatch = false;//await user.comparePassword(password);
    if (user.password === password) {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    res.json({ message: 'Authentication succeeded',id:user.id,token:generateJWT(user.id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/signup', async (req, res) => {
  console.log("here in the sign up")
  const { username, email, password } = req.body;


  try {

    
    const lastId = await User.findOne().sort({id:-1})
    let newId = 0
    if(lastId){
        newId = lastId.id
    }
    newId++

    // Check if user with given username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    id=newId
    // Create a new user with the given attributes
    const user = new User({
       id,
      username,
      email,
      password
    });

    // Save the new user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateJWT(userid){
  const token = jwt.sign({ userId: userid }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token
}

module.exports = router;