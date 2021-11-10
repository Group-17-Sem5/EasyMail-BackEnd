const clerkController=require('../../controller/clerk/MailController');
const mail =require('../../models/mail-model');
const mongoose = require("mongoose"); 



// beforeAll(() => {
//     const url = 'mongodb://localhost:27017/null';
//     mongoose.connect(url, { useUnifiedTopology : true, useNewUrlParser : true  });
//   });
describe('mail page',()=>{
    it ('get all the mails',async()=>{
        const mailLi=await mail.find({});
        await clerkController.getAll().then(function (result) {
            res.json(result)
          });
         
        expect(res["mails"]).toBe(mailLi);
    });
});