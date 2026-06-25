const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    min: [8, "age cannot be negative"]
  },
  hobbies: {
    type: String,
    trim: true, 
    lowercase: true,
  },
  pets: {
    type: String,
    trim: true,
    lowercase: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userschema);