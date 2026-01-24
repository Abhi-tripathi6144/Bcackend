const mongoose = require('mongoose');

const {configDotenv} = require('dotenv')

configDotenv()

const url = process.env.DB_URL
console.log("url",url);

const connectDB = async()=>{
    try {
        const db = await mongoose.connect(url);
        console.log('Database connected')
    } catch (error) {
        console.log('error')

    }
}

module.exports = connectDB