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
    static async readAllEntityByPostMan(postManId){

        console.log(postManId+"finding assigned Couriers");
        const couriers =await Courier.find({postManID: postManId,isAssigned:true,isDelivered:false,isCancelled:false});
        return couriers;
    }
    static async readDeliveredEntityByPostMan(postManId){

        console.log(postManId+"finding assigned Couriers");
        const couriers =await Courier.find({postManID: postManId,isAssigned:true,isDelivered:true});
        return couriers;
    }
    static async readCancelledEntityByPostMan(postManId){

        console.log(postManId+"finding assigned Couriers");
        const couriers =await Courier.find({postManID: postManId,isAssigned:true,isCancelled:true});
        return couriers;
    }

    static async confirmOneEntity(courierId,value){
        console.log("Value is updating");
        const courier=await Courier.updateOne({_id: courierId},{$set:{isDelivered:true,isCancelled:false}});
        return courier;
        }
    static async cancelOneEntity(courierId){
        console.log('the delivery is cancelling');
        const courier=await Courier.updateOne({_id: courierId},{$set:{isDelivered:false,isCancelled:true}});
        return courier;
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = CourierDAO;