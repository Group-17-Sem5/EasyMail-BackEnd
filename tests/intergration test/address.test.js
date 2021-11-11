const AddressController = require('../../controller/postMaster/AddressController')
const Address = require('../../models/address-model')
const mongoose = require("mongoose")

describe('addresses',()=>{
    it ('get all the addresses',async()=>{
        const addressLi=await Address.find({});
        await AddressController.findAll()
         
        expect(res["addresses"]).toBe(addressLi);
    });
});
