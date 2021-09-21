const config = require('../../config/DB');
const express=require('express');
const Address=require('../address-model');
class AddressDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(addressDetails){
        const address = Address.create({
            addressID:addressDetails.addressID,
            description:addressDetails.description,
            branchID:addressDetails.branchID,
            location:addressDetails.location,
            branchID:addressDetails.branchID,
            userIDList:[]
        });
        return address;
    }

    static async readAllEntity(){
        const addressesList = await Address.find({});
       
         return addressesList;
    }

    static async readOneEntity(addressID){
        const address= await Address.findOne({addressID:addressID});
        return address;
        
    }

    static async updateOneEntity(details){
        const status= await Address.updateOne({addressID:details.addressID}, { $set: { "description" : details.description, "location" : details.location},returnNewDocument : true  });
        return status;
    }

    static async deleteOneEntity(detail){
        const address =await Address.deleteOne({addressID:detail.addressID});
      
        return address;
        
    }
}
module.exports = AddressDAO;