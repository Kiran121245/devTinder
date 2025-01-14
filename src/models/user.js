const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 4
    },
    last_name: {
        type: String
    },
    age: {
        type: Number
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    }
},{
    timestamps: true,
});

// Create unique indexes for the first_name and email fields
/* userSchema.index({ first_name: 1 }, { unique: true }); */ 
/* userSchema.index({ emailId: 1 }, { unique: true }); */


const User = mongoose.model("User", userSchema); // Creating User model provided by mongoose.
User.on('index', (err) => {
    if (err) {
        console.error("Error creating indexes:", err);
    } else {
        console.log("Indexes created successfully");
    }
});

module.exports = User;