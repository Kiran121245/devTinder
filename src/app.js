const express = require("express");
const dbconnect = require("./config/database")
const User = require("./models/user")

const app = express(); // this is an instance of the express application

app.use(express.json()); // express json middleware

// Getting the user by email
app.get("/user", async (req, res)=>{ 
    // console.log(req.body.email);
    const userEmail = req.body.email;
    try{
        const users = await User.find({email: userEmail});
        // console.log(users);
        if (users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(500).send("Something went wrong");
    }
    
      
});

// Getting all the Users
app.get("/users", async (req, res)=>{ 
    try{
        const users = await User.find({});
        // console.log(users);
        if (users.length === 0){
            res.status(404).send("No Users in Database");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(500).send("Something went wrong");
    }
    
      
});

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
