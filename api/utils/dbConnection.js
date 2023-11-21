const mongoose = require('mongoose')

async function con() {
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri); //from mongoose docs
    console.log('DB Connection Successful');
}

exports.con = con;