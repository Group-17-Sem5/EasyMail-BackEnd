const config = require('../../config/DB');
const express=require('express');
const Courier=require('../courier-model');
class CourierDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntityBySender(senderId){
      console.log(senderId+"finding sent Couriers");
        const couriers  =await Courier.find({senderID: senderId});
        return couriers;

    }
    static async readAllEntityByReceiver(receiverID){

        console.log(receiverID+"finding received couriers");
        const couriers =await Courier.find({receiverID: receiverID});
        return couriers;
    }

    static async readOneEntity(courierId){
        console.log(courierId+" finding details");
        const details =await Courier.findOne({courierID: courierId});
        return details;
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = CourierDAO;