// const express=require('express');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/easyMail', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
// const connection =mongoose.connection;
// connection.once("open", () => {
//     console.log("mongoDB connected");
// });

const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/easyMail';

//to connect or create our database
mongoose.connect(url, { useUnifiedTopology : true, useNewUrlParser : true , }).then(() => {
   console.log("Connection successful");
}).catch((e) => console.log("No connection"));