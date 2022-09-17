const mongoose = require('mongoose');

// *********************** connecting to database ***********************//
const connectDB = async (dbURL) => { 
    return mongoose.connect(dbURL)
}
module.exports = connectDB;