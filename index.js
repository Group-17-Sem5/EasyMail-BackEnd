const express=require('express');
const mongoose = require('mongoose');
const postManRoute= require('./routes/postMan');
const app = express();
mongoose.connect('mongodb://localhost:27017/easyMail', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const Port =process.env.port || 5000;
const connection =mongoose.connection;
connection.once("open", () => {
    console.log("mongoDB connected");
});
app.use(express.json());
app.use("/postman",postManRoute);
app.route("/").get((req,res)=>res.json('First Api Sandaru'));
app.listen(Port,()=>console.log('listning to port '+Port ));