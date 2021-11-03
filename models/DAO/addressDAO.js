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
            lat:addressDetails.lat,
            lng:addressDetails.lng,
            branchID:addressDetails.branchID,
            userIDList:[]
        });
        return address;
    }

    static async readAllEntity(){
        const addressesList = await Address.find();
       
         return addressesList;
    }
    static async readTheAllEntity(){
        const addressesList = await Address.find();
       
         return addressesList;
    }

    static async readOneEntity(addressID){
        const address= await Address.findOne({addressID:addressID});
        return address;
        
    }

    static async updateOneEntity(details){
        const status= await Address.updateOne({addressID:details.addressID}, { $set: { "lat" : details.lat, "lng" : details.lng},returnNewDocument : true  });
        return {ok:1,result:status,msg:"successful"
        
        };
    }
    static async updateAddress(id,details){
        const status= await Address.updateOne({addressID:id}, { $set: {"branchID":details.branchID,"description":details.description},returnNewDocument : true  });
        return {ok:1,result:status,msg:"successful"
        
        };
    }
    static async deleteOneEntity(detail){
        const address =await Address.deleteOne({addressID:detail});
      
        return address;
        
    }
}
module.exports = AddressDAO;