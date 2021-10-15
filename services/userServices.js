const PostManDAO = require('../models/DAO/postManDAO');
const MailDAO= require('../models/DAO/mailDAO');
const AddressDAO= require('../models/DAO/addressDAO');
const MoneyOrderDAO= require('../models/DAO/moneyOrderDAO');
const UserDAO= require('../models/DAO/userDAO');
const QueryDAO= require('../models/DAO/queryDAO');
const config= require('../config/config');
const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
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
                    const cmp = await bcrypt.compare(req.password, user.password);
                    if (cmp){
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
                    const cmp = await bcrypt.compare(details.password, user.password);
                    if (cmp){
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
    async changeMyAddress(details,oldAddress){
        

        try{
            console.log(details.addressID);
        await QueryDAO.removeUserFromAddress(oldAddress,details.username);
        console.log(details.addressDescription,details.addressID);
         await QueryDAO.addUserToAddress(details.addressID,details.username);
        await QueryDAO.changeMyAddress(details.username,details.addressID);
        return true;
        }catch(error){
            console.log("error when changing the address");
            return false;
        }
    }
    async getMyMoneyOrdersList(userID){
        try {

            var moneyOrdersList = [];
            
            var moneyOrders = await MoneyOrderDAO.readAllEntityBySender(userID);
            //console.log(moneyOrders);
            moneyOrders.forEach(moneyOrder => {
                let moneyOrderID = moneyOrder.moneyOrderID;
                let specialCode = moneyOrder.specialCode;
                let amount =moneyOrder.amount;
                let date =moneyOrder.date;
                let sourceBranch=moneyOrder.sourceBranch;
                let receivingBranch=moneyOrder.receivingBranch;
                let senderID=moneyOrder.senderID;
                let receiverID=moneyOrder.receiverID;
                let isDelivered=moneyOrder.isDelivered;
                let isCancelled=moneyOrder.isCancelled;
           
                var OneMoneyOrder = {moneyOrderID,specialCode,amount,date,sourceBranch,receivingBranch,senderID,receiverID,isDelivered,isCancelled };
                moneyOrdersList.push(OneMoneyOrder);
            });

            return moneyOrdersList;
        
            //    [
            //        {
            //            route_id:1,
            //            description: Colombo,Pan
            //        },
            //             ..........
            //    ]

        } catch (error) {
            console.log('Error when finding moneyOrders');
        }
    }
    async trackMyCourier(userID){}
    async getMail(userID,mailID){
        try{
            var mail = await QueryDAO.readOneEntityByReceiver(userID,mailID);
            return mail;
        }catch(error){
            console.log("error when finding the mail");
        }
    }
    

}
module.exports = UserService;