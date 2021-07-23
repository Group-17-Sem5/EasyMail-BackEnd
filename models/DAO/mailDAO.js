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
        // Mail.find({}, function (err, mails) {
        //     console.log(mails);
        //     return res.send(mails);
        // });
        // Mail.find().exec(function(err, mail){
        //     console.log('mails : ', mail);
        //     console.log('err', err);
        //     return mail;
        //    });
        
        const mailsList = await Mail.find({postManID: postManId});
       
        // const mailMap = {};
        // mails.forEach((mail) => {
        //     mailMap[mailID] = mail;
        // });
        //const mails=[{mailID:"d",location:"jsdhf",postManID:"kusdf",status:"sjdufg",description:"fadf"},{mailID:"da",location:"jsdhf",postManID:"kusdf",status:"sjdufg",description:"fadf"}]
        return mailsList;
    }

    static async readOneEntity(mailId){
        console.log(mailId);
        const mail =await Mail.findOne({mailID: mailId});
        return mail;
    }

    static async updateOneEntity(mailId,value){
        console.log("Value is updating");
        const mail=await Mail.updateOne({mailID: mailId},{$set:{isDelivered:value}});
        return mail;
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = MailDAO;