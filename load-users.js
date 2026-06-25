const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");
require('dotenv').config();
const mongoose = require('mongoose');
const user = require('./model/user.js');
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    age: 25,
    hobbies: "Reading, Hiking, Cooking",
    pets: "dog"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    age: 30,
    hobbies: "Traveling, Painting, Yoga",
    pets: "cat"
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    age: 22,
    hobbies: "Gaming, Running, Photography",
    pets: "bird"
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    age: 28,
    hobbies: "Dancing, Writing, Swimming",
    pets: "fish"
  },
  {
    name: "David Brown",
    email: "david@example.com",
    age: 35,
    hobbies: "Cycling, Gardening, Music",
    pets: "hamster"
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    age: 27,
    hobbies: "Cooking, Traveling, Reading",
    pets: "rabbit"
  },
  {
    name: "Chris Miller",
    email: "chris@example.com",
    age: 31,
    hobbies: "Hiking, Photography, Yoga",
    pets: "turtle"
  },
  {
    name: "Jessica Taylor",
    email: "jessica@example.com",
    age: 24,
    hobbies: "Painting, Running, Music",
    pets: "guinea pig"
  },
  {
    name: "Daniel Anderson",
    email: "daniel@example.com",
    age: 29,
    hobbies: "Gaming, Writing, Swimming",
    pets: "snake"
  },
  {
    name: "Olivia Thomas",
    email: "olivia@example.com",
    age: 26,
    hobbies: "Reading, Hiking, Cooking",
    pets: "hamster"
  },
];

async function loadUsers() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.l50km6j.mongodb.net/idan70000_db?appName=Cluster1`);
        console.log('Connected to MongoDB for loading users');
        await user.deleteMany({}); // ← מוחק את כל המשתמשים הקיימים
        console.log('Cleared existing users');
        await user.insertMany(users);
        console.log('Users loaded successfully!! 🎉🎉🎉');
    } catch (error) {
        console.error('Error loading users:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

loadUsers();