const config = require('../../config/DB');
const Mail = require('../mail-model');
const express=require('express');
const { connection } = require('mongoose');
class MailDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntity(postManId){

        const mailsList = await Mail.find({postManID: postManId,isDelivered:false,isCancelled:false,isAssigned:true});
        return mailsList;
    }
    
    static async readOneEntity(mailId){
        console.log(mailId);
        const mail =await Mail.findOne({mailID: mailId});
        return mail;
    }

    static async updateOneEntity(mailId,value){
        console.log("Value is updating");
        const mail=await Mail.updateOne({_id: mailId},{$set:{isDelivered:true,isCancelled:false}});
        return mail;
        }
    static async cancelOneEntity(mailId){
        console.log('the delivery is cancelling');
        const mail=await Mail.updateOne({_id: mailId},{$set:{isDelivered:false,isCancelled:true}});
        return mail;
    }
    static async deleteOneEntity(){
        
    }
}
module.exports = MailDAO;