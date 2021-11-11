const clerkController=require('../../controller/clerk/MoneyOrderController');
const moneyorder =require('../../models/moneyOrder-model');
const mongoose = require("mongoose"); 



// beforeAll(() => {
//     const url = 'mongodb://localhost:27017/null';
//     mongoose.connect(url, { useUnifiedTopology : true, useNewUrlParser : true  });
//   });
describe('money orders',()=>{
    it ('get all the money orders',async()=>{
        const addressLi=await moneyorder.find({});
        await clerkController.getAll.then(function (result) {
            res.json(result)
          });
         
        expect(res["money orders"]).toBe(addressLi);
    });
});