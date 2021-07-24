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

    static async createOneEntity(){

    }

    static async readAllEntity(){
        const addressesList = await Address.find({});
       
         return addressesList;
    }

    static async readOneEntity(userId){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = AddressDAO;