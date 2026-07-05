const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
     'http://127.0.0.1:5500',
     'http://localhost:3000',
    process.env.RENDER_EXTERNAL_URL
].filter(Boolean);
const app = express();
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!! 🚫, please check your origin at app.js'));
        }
    }
}));


const userRoutes = require('./routes/users.js');
app.use(express.json());
connectDB(); 

if(!process.env.JWD_SECRET) {
   console.error('JWD_SECRET is not defined in the environment variables. Please set it in your .env file.');
   process.exit(1); 
}


app.get('/', (req, res) => {
    res.send( ' Hello, World! 🌏 my name is Idan Nadler and welcome to my project :) ' );
});
app.get('/health', (req, res) => {
    const dbstatus = ['disconnected', 'connecting', 'connected', 'disconnecting'];
    const dbconnected = mongoose.connection.readyState === 1;
    res.status(dbconnected ? 200 : 503).json({
        status: dbconnected ? 'ok' : 'error',
        db: dbstatus[mongoose.connection.readyState],
        runtime: `${Math.floor(process.uptime())}Seconds`,
        environment: process.env.NODE_ENV || 'development',
    });
});

app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {//השרת שלנו יכול לפרסר מידע בצורת ג'ייסון
    console.log(`app is running on port!!!!!!!!!!!!!!!!!!!!!!! ${PORT} 🤖`);
});

