const mongoose = require('mongoose')
const mongoURL = "mongodb://127.0.0.1:27017/chat?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2"
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;