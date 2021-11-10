const postRouter= require("../../../routes/clerk/post");
const Mail =require("../../../models/mail-model");
const userRoutes = require("../../../routes/clerk/user");
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
    mongoose.connect("mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/sepTest?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });

//   afterEach((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(() => done())
//     });
//   });
  



    test("GET clerk/post/", async () => {
        const postList = await Mail.find();
      
        await supertest(app).get("/clerk/post")
          .expect(200)
          .then((res) => {
            // Check type and length
            
            expect(res.body['mailModel'].length).toBeGreaterThanOrEqual(0);
      
            // Check data
            expect(res.body['mailModel'].sourceBranchID).toBe(postList[0].sourceBranchID);
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