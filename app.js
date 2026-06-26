const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');


const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
const PORT = 3000;
const userRoutes = require('./routes/users.js');
app.use(express.json());
connectDB(); 


app.get('/', (req, res) => {
    res.send( ' Hello, World! 🌏 and welcome to my project :) ' );
});

app.use("/api/users", userRoutes);



app.listen(PORT, () => {//השרת שלנו יכול לפרסר מידע בצורת ג'ייסון
    console.log(`app is running on port!!!!!!!!!!!!!!!!!!!!!!! ${PORT} 🤖`);
});

