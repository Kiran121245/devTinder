const express = require("express");

const app = express(); // this is an instance of the express application

// Define route-specific handlers
app.get("/", (req, res) => { // [CHANGED! Used app.get() instead of app.use()]
    res.send("From /");
});

app.get("/hello", (req, res) => { // [CHANGED! Used app.get() instead of app.use()]
    res.send("From hello");
});

app.get("/test", (req, res) => { // [CHANGED! Used app.get() instead of app.use()]
    res.send("From test");
});

app.listen(3000, () => {
    console.log("Server is running successfully on port 3000");
});