const PostManDAO = require('../models/DAO/postManDAO');
const MailDAO= require('../models/DAO/mailDAO');
const AddressDAO= require('../models/DAO/addressDAO');
const UserDAO= require('../models/DAO/userDAO');
const QueryDAO= require('../models/DAO/queryDAO');
const config= require('../config/config');
const jwt=require('jsonwebtoken');
class UserService{
    constructor(){

    }
    async getReceivedMailsList(userID){
        try {

            var mailList = [];
            
            var mails = await QueryDAO.readAllEntityReceivedByUser(userID);
            
            mails.forEach(mail => {
                let mailID = mail.mailID;
                let addressID = mail.addressID;
                let isAssigned= mail.isAssigned;
                let isDelivered =mail.isDelivered;
                let postManID=mail.postManID;
                let lastAppearedBranch = mail.lastAppearedBranch;
                let sourceBranchID=mail.sourceBranchID;
                let receivingBranchID=mail.receivingBranchID;
                let senderID=mail.senderID;
                let receiverID=mail.receiverID;
                var OneMail = { mailID, addressID,isAssigned,isDelivered,lastAppearedBranch,sourceBranchID,receivingBranchID,postManID,senderID,receiverID };
                mailList.push(OneMail);
            });

            return mailList;
        
            //    [
            //        {
            //            route_id:1,
            //            discription: Colombo,panadura
            //        },
            //             ..........
            //    ]

        } catch (error) {
            console.log('Error when finding mail');
        }
    }
    async login(req) {
        try {

            var user = "";
            // var result=json();
            var user = await UserDAO.readOneEntity(req.username);
                if(user){
                    //console.log(postMan);
                    if (user.password===req.password){
                        console.log('Password is correct');
                        let token= jwt.sign({username:req.username},config.key,{expiresIn:"6h"});
                        //console.log(token);
                        return {
                            err:0,
                            token: token,
                            msg:"Success",
                        };
                    }else{
                        console.log('password is incorrect');
                        return {
                            err:1,
                            msg:'password is incorrect'
                        };
                        
                    }
                }else{
                    console.log('Check the user name again');
                    return {
                        err:1,
                        msg:'check the user name'
                    };
                }
        } 
        catch (error) {
            console.log('Error when finding user');
            return {
                err:1,
                msg:'Something wend wrong'
            };
        }

    }
    async register(details){

        try {
         let user=await UserDAO.createOneEntity(details);
                if(user){
                    console.log(user);
                    if (user.password===details.password){
                        console.log('Password is correct');
                        let token= jwt.sign({username:details.username},config.key,{expiresIn:"6h"});
                        //console.log(token);
                        return {
                            err:0,
                            token: token,
                            msg:"Success",
                        };
                    }else{
                        console.log('password is incorrect');
                        return {
                            err:1,
                            msg:'password is incorrect'
                        };
                        
                    }
                }else{
                    console.log('Check the user name again');
                    return {
                        err:1,
                        msg:'check the user name'
                    };
                }
        } 
        catch (error) {
            console.log('Error when finding user');
            return {
                err:1,
                msg:'Something wend wrong'
            };
        }

    }

    async getSentMailsList(userID){
        try {

            var mailList = [];
            
            var mails = await QueryDAO.readAllEntitySentByUser(userID);
            
            mails.forEach(mail => {
                let mailID = mail.mailID;
                let addressID = mail.addressID;
                let isAssigned= mail.isAssigned;
                let isDelivered =mail.isDelivered;
                let postManID=mail.postManID;
                let lastAppearedBranch = mail.lastAppearedBranch;
                let sourceBranchID=mail.sourceBranchID;
                let receivingBranchID=mail.receivingBranchID;
                let senderID=mail.senderID;
                let receiverID=mail.receiverID;
                var OneMail = { mailID, addressID,isAssigned,isDelivered,lastAppearedBranch,sourceBranchID,receivingBranchID,postManID,senderID,receiverID };
                mailList.push(OneMail);
            });

            return mailList;
        
            //    [
            //        {
            //            route_id:1,
            //            description: Colombo,Pan
            //        },
            //             ..........
            //    ]

        } catch (error) {
            console.log('Error when finding mail');
        }
    }
    async changeMyAddress(details,userID){
        console.log(details.oldAddressID);
        await QueryDAO.removeUserFromAddress(details.oldAddressID,userID);
        console.log(details.addressDescription,details.addressID);
        var result= await QueryDAO.addUserToAddress(details.addressID,userID);
        return result;
    }
    async getMyMoneyOrdersList(userID){
        var moneyOrderList = [];
        return moneyOrderList;
    }
    async trackMyCourier(userID){}
    async getMail(mailID){
        try{
            var mail = await MailDAO.readOneEntity(mailID);
            return mail;
        }catch(error){
            console.log("error when finding the mail");
        }
    }
    

}
module.exports = UserService;