const config = require('../../config/DB');
const express=require('express');
const MoneyOrder=require('../moneyOrder-model');
class MoneyOrderDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntityBySender(senderId){
      console.log(senderId+"finding sent money orders");
        const moneyOrders =await MoneyOrder.find({senderID: senderId});
        return moneyOrders;

    }
    static async readAllEntityByReceiver(receiverID){

        console.log(receiverID+"finding received money orders");
        const moneyOrders =await MoneyOrder.findOne({receiverID: receiverID});
        return moneyOrders;
    }

    static async readOneEntity(username){
        // console.log(username+"logging in");
        // const postMan =await PostMan.findOne({username: username});
        // return postMan;
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = MoneyOrderDAO;