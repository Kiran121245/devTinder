const express = require("express");

const app = express(); // this is an instance of the express application


// This will only handle get call for /user
app.get("/user", (req, res) => {
    res.send({
        "firstname":"Kiransai",
        "age":25

    });
});


//this will only handle post call for /user
app.post("/user", (req, res) => {
    console.log("Saved data successfully")
    res.send("Successfully saved data to database.");
});

//this will only handle delete call for /user
app.delete("/user", (req, res) => {
    console.log("Deleted data successfully")
    res.send("Successfully deleted data in database.");
});


app.listen(3000, () => {
    console.log("Server is running successfully on port 3000");
});