const config = require('../../config/DB');
const Mail = require('../mail-model');
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
}
module.exports = QueryDAO;