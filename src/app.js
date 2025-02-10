const express = require("express");
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user");

 // to read the json data we need a middleware
app.use(express.json());


app.post("/signup",async (req, res) => {
    // creating a instannce of the user model 
    const user =  new User(req.body);
    try{
        await user.save();
        res.send(" user added in kanban ");
    } catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
   
});





connectDB().then(() =>{
    console.log('Connected to the database');
    app.listen(3000 , () =>{
        console.log("server is sucessfully running");
    });
 }).catch( err =>{
     console.log(' not Connected to the database');
 })
