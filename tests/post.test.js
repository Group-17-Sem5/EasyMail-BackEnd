const app = require('../server')
const Post = require('../models/postMaster/post')
const mongoose = require("mongoose");
const supertest = require("supertest");
const Branch = require('../models/postMaster/branch')
const User = require('../models/postMaster/user')
const Address = require('../models/postMaster/address')
const Postman = require('../models/postMan-model')

beforeEach((done) => {
  mongoose.connect("mongodb+srv://kaja:Kajanan1234@electro.u9gv5.mongodb.net/sepTest?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach( (done) => {
    mongoose.connection.db.dropCollection('posts',() => {
    mongoose.connection.close(() => done())
  });
});

test("GET /api/postMaster/post", async () => {
  await User.deleteMany({})
await Postman.deleteMany({})
await Branch.deleteMany({})
  const branch = await Branch.create({
    branchName:"kopay",
    mobileNumber:'0768655434',
    address:"Jaffna"
  })
  const address = await Address.create({
    address:'velanai west'
  })
  const user = await User.create({
    email:"kajanan023@gmail.com",
    password:'0768655434',
    mobileNumber:"0768655434",
    addressId:address.id,
    name:'kaja'
  })
  const postman = await Postman.create({
    username:'kajanan98',
    password:'1234567890',
    email:'kajanan023@gmail.com',
    mobileNumber:'0765455434',
    area:'velanai mmv road',
    branchId:branch.id
  })
  const post = await Post.create({ 
      sourceBranchID:branch.id,
      lastAppearedBranchID:branch.id,
      senderID:user.id,
      receiverID:user.id,
      postManID:postman.id
  });

  await supertest(app).get("/api/postMaster/post/")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(post.id);
      // expect(response.body[0].sourceBranchID).toBe(post.sourceBranchID);
      // expect(response.body[0].lastAppearedBranchID).toBe(post.lastAppearedBranchID);
      // expect(response.body[0].senderID).toBe(post.senderID);
      // expect(response.body[0].receiverID).toBe(post.receiverID);
      // expect(response.body[0].postManID).toBe(post.postManID);
    });
});


//   test("POST /api/postMaster/post/add", async () => {
//     const data = { 
//         sourceBranchID:'615629c9bee2d826943033d6',
//         lastAppearedBranchID:'615629c9bee2d826943033d6',
//         senderID:"61562b0976df4d40b086e987",
//         receiverID:"61562b0976df4d40b086e987",
//         postManID:"61562b4266089c5ac84ec452"
//     };

//     await supertest(app).post("/api/postMaster/post/add")
//       .send(data)
//       .expect(200)
//       .then(async (response) => {
//         // Check the response
//         expect(response.body._id).toBeTruthy();
//         expect(response.body.sourceBranchID).toBe(data.sourceBranchID);
//         expect(response.body.lastAppearedBranchID).toBe(data.lastAppearedBranchID);
//         expect(response.body.senderID).toBe(data.senderID);
//         expect(response.body.receiverID).toBe(data.receiverID);
//         expect(response.body.postManID).toBe(data.postManID);

//         // Check data in the database
//         const post = await Post.findOne({ _id: response.body._id });
//         expect(post).toBeTruthy();
//         expect(post.sourceBranchID).toBe(data.sourceBranchID);
//         expect(post.lastAppearedBranchID).toBe(data.lastAppearedBranchID);
//         expect(post.senderID).toBe(data.senderID);
//         expect(post.receiverID).toBe(data.receiverID);
//         expect(post.postManID).toBe(data.postManID);
//       });
//   });


// test("GET /api/postMaster/post/:id", async () => {
//   await User.deleteMany({})
//   await Postman.deleteMany({})
//   await Branch.deleteMany({})
//   const branch = await Branch.create({
//     branchName:"kopay",
//     mobileNumber:'0768655434',
//     address:"Jaffna"
//   })
//   const address = await Address.create({
//     address:'velanai west'
//   })
//   const user = await User.create({
//     email:"kajanan3@gmail.com",
//     password:'0768655434',
//     mobileNumber:"0768655434",
//     addressId:address.id,
//     name:'kaja'
//   })
//   const postman = await Postman.create({
//     username:'kajanan98',
//     password:'1234567890',
//     email:'kajanan23@gmail.com',
//     mobileNumber:'0765455434',
//     area:'velanai mmv road',
//     branchId:branch.id
//   })
//   const post = await Post.create({ 
//       sourceBranchID:branch.id,
//       lastAppearedBranchID:branch.id,
//       senderID:user.id,
//       receiverID:user.id,
//       postManID:postman.id
//   });


//     await supertest(app).get("/api/postMaster/post/" + post.id)
//       .expect(200)
//       .then((response) => {
//         expect(response.body._id).toBe(post.id);
//         console.log(post)
//         console.log(response.body)
//         expect(response.body.sourceBranchID).toBe(post.sourceBranchID);
//         expect(response.body.lastAppearedBranchID).toBe(post.lastAppearedBranchID);
//         expect(response.body.senderID).toBe(post.senderID);
//         expect(response.body.receiverID).toBe(post.receiverID);
//         expect(response.body.postManID).toBe(post.postManID);
//       });
//   });