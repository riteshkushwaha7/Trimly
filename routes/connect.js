const mongoose = require("mongoose");

async function connectDB(url){
    try{
        await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);console.log(`MongoDB connected successfully`);}
catch(err){
    console.log(`MongoDB connection error: `, err);
    process.exit(1);
}

}
module.exports = {connectDB};