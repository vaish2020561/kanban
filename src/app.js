const express = require("express");

const app = express();

app.use("/hello",(req, res) => {
    res.send("Hello ");
});
app.use("/",(req, res) => {
    res.send("Hello from server");
});

app.use("/dashboard",(req, res) => {
    res.send("Hello from dashboard");
});
app.listen(3000 , () =>{
    console.log("server is sucessfully running");
});