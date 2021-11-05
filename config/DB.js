const express=require('express');
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/easyMail', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
mongoose.connect('mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/EasyMailDB', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const connection =mongoose.connection;
connection.once("open", () => {
    console.log("mongoDB connected");
});