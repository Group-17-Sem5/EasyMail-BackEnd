const config = require('../../config/DB');
const Mail = require('../mail-model');
const express=require('express');
class MailDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntity(){
        // Mail.find({}, function (err, mails) {
        //     console.log(mails);
        //     return res.send(mails);
        // });
        // Mail.find().exec(function(err, mail){
        //     console.log('mails : ', mail);
        //     console.log('err', err);
        //     return mail;
        //    });
        
        const mails = await Mail.find();
       
        // const mailMap = {};
        // mails.forEach((mail) => {
        //     mailMap[mailID] = mail;
        // });
        //const mails=[{mailID:"d",location:"jsdhf",postManID:"kusdf",status:"sjdufg",description:"fadf"},{mailID:"da",location:"jsdhf",postManID:"kusdf",status:"sjdufg",description:"fadf"}]
        return mails;
    }

    static async readOneEntity(mailId){
        Mail.findOne({mailID:mailId},(err,results) => {

        });
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = MailDAO;