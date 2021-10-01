const app = require('../server')
const Clerk = require('../models/postMaster/clerk')
const mongoose = require("mongoose");
const supertest = require("supertest");
const Branch = require('../models/postMaster/branch')



beforeEach((done) => {
    mongoose.connect("mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/sepTest?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach( (done) => {
     mongoose.connection.db.dropCollection('clerks',() => {
      mongoose.connection.close(() => done())
    });
  });


test("GET /api/postMaster/clerk", async () => {
    const branch = await Branch.create({ 
        branchName:"kopay",
        mobileNumber:'0768655434',
        address:"Jaffna"
    });
    const post = await Clerk.create({ 
        username:'kajanan',
        email:'kajanan@gmail.com',
        mobileNumber:'078665654',
        branchId:branch.id,
        password:'12werfdgt4'
    });

  await supertest(app).get("/api/postMaster/clerk/")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      // expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(post.id);
      expect(response.body[0].username).toBe(post.username);
      expect(response.body[0].mobileNumber).toBe(post.mobileNumber);
      expect(response.body[0].email).toBe(post.email);
      expect(response.body[0].branchId).toBe(post.branchId);
    });
    await Branch.findByIdAndDelete(branch.id)
});


test("POST /api/postMaster/clerk/add", async () => {
    const branch = await Branch.create({ 
        branchName:"kopay",
        mobileNumber:'0768655434',
        address:"Jaffna"
    });
    const data = { 
        username:'kajanan',
        email:'kajanan@gmail.com',
        mobileNumber:'078665654',
        branchId:branch.id,
        password:'12werfdgt4'
    };

  await supertest(app).post("/api/postMaster/clerk/add")
   
    .send(data)
    .expect(200)
    .then(async (response) => {

      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.username).toBe(data.username);
      expect(response.body.mobileNumber).toBe(data.mobileNumber);
      expect(response.body.email).toBe(data.email);
      expect(response.body.branchId).toBe(data.branchId);

      // Check data in the database
      const post = await Clerk.findOne({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.email).toBe(data.email);
      expect(post.mobileNumber).toBe(data.mobileNumber);
      expect(post.username).toBe(data.username);
    //   expect(post.branchId).toBe(data.branchId);
      
    });
    await Branch.findByIdAndDelete(branch.id)
});

test("DELETE /api/postMaster/clerk/delete/:id", async () => {
    const branch = await Branch.create({ 
        branchName:"kopay",
        mobileNumber:'0768655434',
        address:"Jaffna"
    });
    const post = await Clerk.create({
        username:'kajanan',
        email:'kajanan@gmail.com',
        mobileNumber:'078665654',
        branchId:branch.id,
        password:'12werfdgt4'
    });
  
    await supertest(app)
      .delete("/api/postMaster/clerk/delete/" + post.id)
      .expect(200)
      .then(async () => {
        expect(await Clerk.findOne({ _id: post.id })).toBeFalsy();
      });
      await Branch.findByIdAndDelete(branch.id)
  });


  
test("GET /api/postMaster/clerk/:id", async () => {
    const branch = await Branch.create({ 
        branchName:"kopay",
        mobileNumber:'0768655434',
        address:"Jaffna"
    });
    const post = await Clerk.create({
        username:'kajanan',
        email:'kajanan@gmail.com',
        mobileNumber:'078665654',
        branchId:branch.id,
        password:'12werfdgt4'
    });
  
    await supertest(app).get("/api/postMaster/clerk/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id);
        expect(response.body.email).toBe(post.email);
        expect(response.body.mobileNumber).toBe(post.mobileNumber);
        expect(response.body.username).toBe(post.username);
        
      });
      await Branch.findByIdAndDelete(branch.id)
  });
  
  