const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("Database connected successfully !")
        }).catch
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;