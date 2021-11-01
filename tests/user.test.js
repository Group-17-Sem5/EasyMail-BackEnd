const app = require('../server')
const User = require('../models/postMaster/user')
const mongoose = require("mongoose");
const supertest = require("supertest");
const Address = require('../models/postMaster/address')

beforeEach((done) => {
    mongoose.connect("mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/sepTest?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});
  
afterEach( (done) => {
    mongoose.connection.db.dropCollection('users',() => {
    mongoose.connection.close(() => done())
});
});

test("GET /api/postMaster/user", async () => {
    await User.deleteMany({})
    await Address.deleteMany({})
    const address = await Address.create({ 
        address:'velanani west'
    });
    const post = await User.create({ 
        email:"kaja@gmail.com",
        mobileNumber:'0768655434',
        addressId:address.id,
        password:'1234rtyhju',
        name:'kajanan'
    });
  
    await supertest(app).get("/api/postMaster/user/")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].email).toBe(post.email);
        expect(response.body[0].mobileNumber).toBe(post.mobileNumber);
        // expect(response.body[0].addressId).toBe(post.addressId);
        expect(response.body[0].name).toBe(post.name);
        // expect(response.body[0].password).toBe(post.password);
      });
  });


  test("POST /api/postMaster/user/add", async () => {
    await User.deleteMany({})
    // await Address.deleteMany({})
    const data = { 
        email:"kaja@gmail.com",
        mobileNumber:'0768655434',
        address:'velanani west',
        password:'1234rtyhju',
        name:'kajanan'
    };
  
    await supertest(app).post("/api/postMaster/user/add")
      .send(data)
      .expect(200)
      .then(async (response) => {
  
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.email).toBe(data.email);
        expect(response.body.mobileNumber).toBe(data.mobileNumber);
        expect(response.body.name).toBe(data.name);
  
        // Check data in the database
        const post = await User.findOne({ _id: response.body._id });
        expect(post).toBeTruthy();
        expect(post.email).toBe(data.email);
        expect(post.mobileNumber).toBe(data.mobileNumber);
        expect(post.name).toBe(data.name);
        
      });
  });


  test("DELETE /api/postMaster/user/delete/:id", async () => {
    await User.deleteMany({})
    await Address.deleteMany({})
    const address = await Address.create({ 
      address:'velanani west'
  });
    const post = await User.create({
        email:"kaja@gmail.com",
        mobileNumber:'0768655434',
        addressId:address.id,
        password:'1234rtyhju',
        name:'kajanan'
    });
  
    await supertest(app)
      .delete("/api/postMaster/user/delete/" + post.id)
      .expect(200)
      .then(async () => {
        expect(await User.findOne({ _id: post.id })).toBeFalsy();
      });
  });