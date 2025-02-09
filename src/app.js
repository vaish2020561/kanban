const express = require("express");

const app = express();

app.get("/user",(req,res) => {
    res.send({ firstName: "Vaishnavi", lastName: "Bharti", age: 23});
});
app.post("/user",(req, res) => {
//    console.log(" data saved sucessfully to db");
   res.send("data saved succesfully to db");
});
app.delete("/user",(req, res) => {
//    console.log(" data saved sucessfully to db");
   res.send("data deleted");
});

// app.use("/hello",(req, res) => {
//     res.send("Hello ");
// });
// app.use("/",(req, res) => {
//     res.send("Hello from server");
// });

// app.use("/dashboard",(req, res) => {
//     res.send("Hello from dashboard");
// });
app.listen(3000 , () =>{
    console.log("server is sucessfully running");
});