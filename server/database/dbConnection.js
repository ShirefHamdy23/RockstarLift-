
const mongoose = require('mongoose');
//testing_2
const DB_connection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/rockstarLift');
        console.log('MongoDB Connection Succeeded.');
    } catch (error) {
        console.error('Error in DB connection:', error);
    }
}
module.exports = DB_connection
