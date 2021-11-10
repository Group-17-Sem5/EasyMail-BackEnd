const userRouter= require("../../../routes/api/user");
const moneyorder =require("../../../models/moneyOrder-model");
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
  



    test("GET /clerk/moneyorder", async () => {
        const moneyorderList = await moneyorder.find({senderID:"Kamal01"});
      
        await supertest(app).get("/clerk/moneyorder")
          .expect(200)
          .then((res) => {
            // Check type and length
            
            expect(res.body['moneyorderModel'].length).toBeGreaterThanOrEqual(0);
      
            // Check data
            expect(res.body['moneyorderModel'].sourceBranchID).toBe(moneyorderList[0].sourceBranchID);
            expect(res.body['moneyorderModel'].receiverID).toBe(moneyorderList[0].receiverID);
            expect(res.body['moneyorderModel'].addressID).toBe(moneyorderList[0].addressID);
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