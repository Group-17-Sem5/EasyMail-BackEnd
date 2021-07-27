const express=require('express');
http = require('http');
const HttpStatus = require('http-status');
//const mongoose = require('mongoose');
const routes= require('./routes/index');

const app = express();
//const config = require('./config/DB');
//mongoose.connect('mongodb://localhost:27017/easyMail', {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true});
const Port =process.env.port || 5000;
// const connection =mongoose.connection;
// connection.once("open", () => {
//     console.log("mongoDB connected");
// });
app.use(express.json());
app.route("/").get((req,res)=>res.json('First Api Sandaru'));
app.use('/api',routes);

app.listen(Port,()=>console.log('listning to port '+Port ));