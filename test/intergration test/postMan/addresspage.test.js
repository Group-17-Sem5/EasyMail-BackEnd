const postManController=require('../../../controller/postManController');
const Address =require('../../../models/address-model');
const mongoose = require("mongoose"); 



// beforeAll(() => {
//     const url = 'mongodb://localhost:27017/null';
//     mongoose.connect(url, { useUnifiedTopology : true, useNewUrlParser : true  });
//   });
describe('address page',()=>{
    it ('get all the addresses',async()=>{
        const addressLi=await Address.find({});
        await postManController.searchAddress().then(function (result) {
            res.json(result)
          });
         
        expect(res["addresses"]).toBe(addressLi);
    });
});