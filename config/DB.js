const express=require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/kajaSEP?retryWrites=true&w=majority", {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const connection =mongoose.connection;
connection.once("open", () => {
    console.log("mongoDB connected");
});