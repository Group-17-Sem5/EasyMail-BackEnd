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

    static async readOneEntity(userID){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = AddressDAO;