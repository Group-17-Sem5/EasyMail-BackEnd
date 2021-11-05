
const mongoose = require('mongoose');
const express=require('express');



const cors = require('cors');
const HttpStatus = require('http-status');
const dotenv = require('dotenv')

const http = require('http');

const bcrypt = require("bcrypt");


//const mongoose = require('mongoose');
const routes= require('./routes/index');
//const supertest = require("supertest");

const app = express();
dotenv.config();
const passport = require('passport')
require('./config/passport')(passport);
//const config = require('./config/DB');
//mongoose.connect('mongodb://localhost:27017/easyMail', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const Port = process.env.PORT || 5000;
// const connection =mongoose.connection;
// connection.once("open", () => {
//     console.log("mongoDB connected");
// });
app.use(cors())
app.use(express.json());

//app.use(passport.initialize());

//app.use('/', require('./routes/index'))


//app.listen(Port,()=>console.log('listning to port '+Port ));


//mongoose.connect('mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/EasyMailDB', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
//const connection =mongoose.connection;
//connection.once("open", () => {
    //console.log("mongoDB connected");
//});


app.use(passport.initialize());


app.route("/").get((req,res)=>res.json('First Api'));
app.use('/api',routes);


app.listen(Port,()=>console.log('listning to port '+Port ));

