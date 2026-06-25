const mongoose = require('mongoose');

async function connectDB() {
  try {
    // קטע קוד שעלול להיכשל
    console.log('Attempting to connect to MongoDB...');
    console.log('DB_USER:', process.env.DB_USER ? '✓ Set' : '✗ Missing');
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '✓ Set' : '✗ Missing');
    console.log('welcome to my DB, have fun!!!!');
    
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.l50km6j.mongodb.net/${process.env.DB_NAME}?appName=Cluster1`);
    console.log('mongodb connected successfully!! 🎉🎉🎉🎉🎉')
  } catch (error) {
    // תופס את השגיאה
    console.error('Error connecting 🤯 to MongoDB:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    if (error.reason) console.error('Reason:', error.reason);
  }
}

module.exports = connectDB;//פונקציה זמינה לייבוא בקבצים אחרים 