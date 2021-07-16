const express=require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const Port =process.env.port || 5000;
const connection =mongoose.connection;
connection.once("open", () => {
    console.log("mongoDB connected");
});
const postManRoute= require('.routes/postMan');
app.use("/postman",postManRoute)
app.route("/").get((req,res)=>res.json('First Api Sandaru'));
app.listen(Port,()=>console.log('listning to port '+Port ));