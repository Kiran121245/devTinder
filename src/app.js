const express = require("express");
const dbconnect = require("./config/database")

const app = express(); // this is an instance of the express application

dbconnect().then(()=>{
    console.log("Database connected")
    app.listen(3000, () => {
    console.log(`Server is running on port 3000`);});
}).catch((err)=>{
    console.error(err);
})
