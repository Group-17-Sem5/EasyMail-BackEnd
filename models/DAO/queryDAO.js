const config = require('../../config/DB');
const Mail = require('../mail-model');
const Address=require('../address-model');
const express=require('express');
const { connection } = require('mongoose');
class QueryDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }
    static async readAllEntitySentByUser(userID){
        const mailsList = await Mail.find({senderID: userID});
       
        return mailsList;
    }

    static async readAllEntityReceivedByUser(userID){
        const mailsList = await Mail.find({receiverID: userID});
       
        return mailsList;
    }


    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async removeUserFromAddress(addressID,userID){
        const status= await Address.updateOne({addressID:addressID}, { $pull: { "userIDList" : userID},returnNewDocument : true  });
        console.log(status);
        //!check later
        
    }
    static async addUserToAddress(addressID,userID){
        //const result = Address.findOneAndUpdate({addressID: addressID},{userIDList:userIDLit.remove(userID)})
        return "";
        //!check Later
    }
    static async readOneEntityByReceiver(userID,mailID){
        const mail = await Mail.findOne({receiverID: userID,mailID:mailID});
       
        return mail;
    }



    static async readAllDeliveredMailEntity(postManId){

        const mailsList = await Mail.find({postManID: postManId,isDelivered:true,isCancelled:false});
        return mailsList;
    }
    static async readAllCancelledMailEntity(postManId){

        const mailsList = await Mail.find({postManID: postManId,isDelivered:false,isCancelled:true});
        return mailsList;
    }
}
module.exports = QueryDAO;