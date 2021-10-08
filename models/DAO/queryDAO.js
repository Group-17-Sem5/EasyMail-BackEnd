const config = require('../../config/DB');
const Mail = require('../mail-model');
const User=require('../user-model');
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
    static async removeUserFromAddress(addressId,userID){
        const oldAddress= await Address.findOne({addressID:addressId});
        var userList=oldAddress.userIDList; 
        userList = userList.filter(function(item) {
            return item !== userID
        })
        console.log(userList);
        const status= await Address.updateOne({addressID:addressId}, { $set: { userIDList:userList},returnNewDocument : true  });
        console.log(status);
        //!check later

        
    }
    static async addUserToAddress(addressId,userID){
        const oldAddress= await Address.findOne({addressID:addressId});
        var userList=oldAddress.userIDList; 
        userList.push(userID);
        console.log(userList);
        const result = await Address.updateOne({addressID: addressId},{$set: {userIDList:userList}})
        return result;
        //!check Later
    }
    static async changeMyAddress(userId,newAddressID){
        const result=await User.updateOne({username: userId},{$set:{addressID:newAddressID}});
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