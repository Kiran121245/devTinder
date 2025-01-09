const mongoose = require("mongoose");

const dbconnect = async ()=>{
        await mongoose.connect('mongodb+srv://kiransaigiddaluri98:ilKjztsCZyTtMI4Q@cluster0.otssm.mongodb.net/')
}

module.exports = dbconnect;