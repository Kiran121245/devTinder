const express = require("express");
const dbconnect = require("./config/database")
const User = require("./models/user")

const app = express(); // this is an instance of the express application

app.use(express.json()); // express json middleware

app.post("/signup",async (req, res) => { 
    const user = new User(req.body); //creating new instance of user model

    await user.save(); //saving the user to the database
    res.send("User created successfully");
});

dbconnect().then(()=>{
    console.log("Database connected")
    app.listen(3000, () => {
    console.log(`Server is running on port 3000`);});
}).catch((err)=>{
    console.error(err);
})
