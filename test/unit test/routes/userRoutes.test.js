const userRouter= require("../../../routes/api/user");
const Mail =require("../../../models/mail-model");
const userRoutes = require("../../../routes/api/user");
const app =require('../../../index');
const mongoose = require("mongoose"); 
const supertest =require('supertest');

// beforeEach((done) => {
  // mongoose.connect("mongodb://localhost:27017/null",
  //   { useNewUrlParser: true, useUnifiedTopology: true },
  //   () => done());




//to connect or create our database

// });
// beforeAll(() => {
//   const url = 'mongodb://localhost:27017/null';
//   mongoose.connect(url, { useUnifiedTopology : true, useNewUrlParser : true  });
// });
beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/easyMail",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });

//   afterEach((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(() => done())
//     });
//   });
  



    test("GET /user/mailBox", async () => {
        const postList = await Mail.find({username:"Kamal01"});
      
        await supertest(app).get("/api/mailbox/Kamal01")
          .expect(200)
          .then((res) => {
            // Check type and length
            
            expect(res.body['mailModel'].length).toBeGreaterThanOrEqual(0);
      
            // Check data
            expect(res.body['mailModel'].mailID).toBe(postList[0].mailID);
            expect(res.body['mailModel'].receiverID).toBe(postList[0].receiverID);
            expect(res.body['mailModel'].addressID).toBe(postList[0].addressID);
          });
      });



// let server;
// const route = require('../../../../routes/login')
// const supertest =require('supertest');



// describe('GET /login',()=>{

//     beforeEach(()=>{
//         server = require('../../../../index');

//     });
//     afterEach( ()=>{
//          server.close();

//     });

//     it('if no user logged in should return Driver dashboard',async ()=>{
        
//         const res =await supertest(server).get('/login');
//         expect(res.status).toBe(200);
    

//     })
// })