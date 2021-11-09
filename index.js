const mongoose = require('mongoose');
const express=require('express');
const cors = require('cors');
const HttpStatus = require('http-status');
const http = require('http');
const bcrypt = require("bcryptjs");
const routes= require('./routes/index');
const app = express();
const passport = require('passport')
require('./config/passport')(passport);

const Port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());



app.use(passport.initialize());


app.route("/").get((req,res)=>res.json('First Api'));
app.use('/api',routes);


app.listen(Port,()=>console.log('listning to port '+Port ));

