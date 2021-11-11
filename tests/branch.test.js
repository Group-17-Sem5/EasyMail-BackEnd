const app = require('../server')
const Branch = require('../models/branch')
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
    mongoose.connect("mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/sepTest?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach( (done) => {
     mongoose.connection.db.dropCollection('branches',() => {
      mongoose.connection.close(() => done())
    });
  });


test("GET /api/admin/branch", async () => {
  const post = await Branch.create({ 
      branchName:"kopay",
      mobileNumber:'0768655434',
      address:"Jaffna"
  });

  await supertest(app).get("/api/admin/branch/")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      // expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(post.id);
      expect(response.body[0].branchName).toBe(post.branchName);
      expect(response.body[0].mobileNumber).toBe(post.mobileNumber);
      expect(response.body[0].address).toBe(post.address);
    });
});


test("POST /api/admin/branch/add", async () => {
  const data = { 
      branchName:"kopay",
      mobileNumber:'0768655434',
      address:"Jaffna"
  };

  await supertest(app).post("/api/admin/branch/add")
    .send(data)
    .expect(200)
    .then(async (response) => {

      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.branchName).toBe(data.branchName);
      expect(response.body.mobileNumber).toBe(data.mobileNumber);
      expect(response.body.address).toBe(data.address);

      // Check data in the database
      const post = await Branch.findOne({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.branchName).toBe(data.branchName);
      expect(post.mobileNumber).toBe(data.mobileNumber);
      expect(post.address).toBe(data.address);
      
    });
});


test("GET /api/admin/branch/:id", async () => {
  await Branch.deleteMany({})
  const post = await Branch.create({ 
      branchName:"kopay",
      mobileNumber:'0768655434',
      address:"Jaffna"
    });

  await supertest(app).get("/api/admin/branch/" + post.id)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(post.id);
      expect(response.body.branchName).toBe(post.branchName);
      expect(response.body.mobileNumber).toBe(post.mobileNumber);
      expect(response.body.address).toBe(post.address);
      
    });
});


test("DELETE /api/admin/branch/delete/:id", async () => {
  const post = await Branch.create({
      branchName:"kopay",
      mobileNumber:'0768655434',
      address:"Jaffna"
  });

  await supertest(app)
    .delete("/api/admin/branch/delete/" + post.id)
    .expect(200)
    .then(async () => {
      expect(await Branch.findOne({ _id: post.id })).toBeFalsy();
    });
});


test("Update /api/admin/branch/update/:id", async () => {
  await Branch.deleteMany({})
  const post = await Branch.create({ 
      branchName:"kopay",
      mobileNumber:'0768655434',
      address:"Jaffna"
  });

  const data = { 
      branchName:"kopay",
      mobileNumber:'0768655434',
      address:"Colombo"
  };

  await supertest(app).post("/api/admin/branch/update/" + post.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      // expect(response.body._id).toBe(post.id);
      // expect(response.body.branchName).toBe(data.branchName);
      // expect(response.body.mobileNumber).toBe(data.mobileNumber);
      // expect(response.body.address).toBe(data.address);

      // Check the data in the database
      // const newPost = await Branch.findOne({ _id: response.body._id });
      // expect(newPost).toBeTruthy();
      // expect(newPost.branchName).toBe(data.branchName);
      // expect(newPost.mobileNumber).toBe(data.mobileNumber);
      // expect(newPost.address).toBe(data.address);
    });
});