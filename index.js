const express=require('express');
const http = require('http')
const HttpStatus = require('http-status');
const bcrypt = require("bcrypt");
//const mongoose = require('mongoose');
const routes= require('./routes/index');
//const supertest = require("supertest");

const app = express();
//const config = require('./config/DB');
//mongoose.connect('mongodb://localhost:27017/easyMail', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const Port =process.env.PORT || 5000;
// const connection =mongoose.connection;
// connection.once("open", () => {
//     console.log("mongoDB connected");
// });
app.use(express.json());
app.route("/").get((req,res)=>res.json('First Api'));
app.use('/api',routes);

app.listen(Port,()=>console.log('listning to port '+Port ));