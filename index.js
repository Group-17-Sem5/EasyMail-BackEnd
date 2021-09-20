const express=require('express');
http = require('http');
const cors = require('cors');
const HttpStatus = require('http-status');
const dotenv = require('dotenv')
//const mongoose = require('mongoose');
const routes= require('./routes/index');
const app = express();
dotenv.config();
const passport = require('passport')
require('./config/passport')(passport);
//const config = require('./config/DB');
//mongoose.connect('mongodb://localhost:27017/easyMail', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const Port =process.env.port || 5000;
// const connection =mongoose.connection;
// connection.once("open", () => {
//     console.log("mongoDB connected");
// });
app.use(cors())
app.use(express.json());
app.use(passport.initialize());
app.route("/").get((req,res)=>res.json('First Api Sandaru'));
app.use('/', require('./routes/index'))

app.listen(Port,()=>console.log('listning to port '+Port ));