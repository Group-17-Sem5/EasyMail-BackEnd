const PostManDAO = require('../models/DAO/postManDAO');
const MailDAO= require('../models/DAO/mailDAO');
const AddressDAO= require('../models/DAO/addressDAO');
const MoneyOrderDAO= require('../models/DAO/moneyOrderDAO');
const UserDAO= require('../models/DAO/userDAO');
const QueryDAO= require('../models/DAO/queryDAO');
const CourierDAO= require('../models/DAO/courierDAO');
const config= require('../config/config');
const jwt=require('jsonwebtoken');
const bcrypt = require("bcryptjs");
class UserService{
    constructor(){

    }
    async getReceivedMailsList(userID){
        try {

            var mailList = [];
            
            var mails = await QueryDAO.readAllEntityReceivedByUser(userID);
            
            mails.forEach(mail => {
                let mailID = mail._id;
                let addressID = mail.addressID;
                let isAssigned= mail.isAssigned;
                let isDelivered =mail.isDelivered;
                let postManID=mail.postManID;
                let lastAppearedBranchID = mail.lastAppearedBranchID;
                let sourceBranchID=mail.sourceBranchID;
                let receivingBranchID=mail.receivingBranchID;
                let senderID=mail.senderID;
                let receiverID=mail.receiverID;
                var OneMail = {mailID, addressID,isAssigned,isDelivered,lastAppearedBranchID,sourceBranchID,receivingBranchID,postManID,senderID,receiverID };
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
                   //console.log(user);
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
                            token:"",
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
                            token:"",
                            msg:'password is incorrect'
                        };
                        
                    }
                }else{
                    console.log('Check the user name again');
                    return {
                        err:1,
                        token:"",
                        msg:'check the user name'
                    };
                }
        } 
        catch (error) {
            console.log('Error when finding user');
            return {
                err:1,
                token:"",
                msg:'Something wend wrong'
            };
        }

    };
    async getAddressList(branchID){
        
        //         var OneAddress = { addressID,location,description,userIDList,branchID,lat,lng };
        //         addressList.push(OneAddress);
        //     });

        //     return addressList;

        // } catch (error) {
        //     console.log('Error when finding Addresses');
        // }


        try {

            var addressList = [];
            
            var addresses = await AddressDAO.readAllEntity(branchID);
            
            addresses.forEach(address => {
                let addressID = address.addressID;
                let description = address.description;
                let lat=address.lat;
                let lng=address.lng;
                let branchID=address.branchID;
                let userIDList = address.userIDList;
                var oneAddress = {addressID,description,lat,lng,branchID,userIDList };
                addressList.push(oneAddress);
            });

            return addressList;
        } catch (error) {
            console.log('Error when finding mail');
        }

    }
    async getAllAddressList(){
        
        //         var OneAddress = { addressID,location,description,userIDList,branchID,lat,lng };
        //         addressList.push(OneAddress);
        //     });

        //     return addressList;

        // } catch (error) {
        //     console.log('Error when finding Addresses');
        // }


        try {

            var addressList = [];
            
            var addresses = await AddressDAO.readTheAllEntity();
            
            addresses.forEach(address => {
                let addressID = address.addressID;
                let description = address.description;
                let lat=address.lat;
                let lng=address.lng;
                let branchID=address.branchID;
                let userIDList = address.userIDList;
                var oneAddress = {addressID,description,lat,lng,branchID,userIDList };
                addressList.push(oneAddress);
            });

            return addressList;
        } catch (error) {
            console.log('Error when finding mail');
        }

    }
    async changeMyProfile(details){
        

        try{
            console.log(details.username);
       
      

        await UserDAO.changeMyProfile(details);
        return true;
        }catch(error){
            console.log("error when changing the profile");
            return false;
        }
    }

    async getSentMailsList(userID){
        try {

            var mailList = [];
            
            var mails = await QueryDAO.readAllEntitySentByUser(userID);
            
            mails.forEach(mail => {
                let mailID = mail._id;
                let addressID = mail.addressID;
                let isAssigned= mail.isAssigned;
                let isDelivered =mail.isDelivered;
                let postManID=mail.postManID;
                let lastAppearedBranchID = mail.lastAppearedBranchID;
                let sourceBranchID=mail.sourceBranchID;
                let receivingBranchID=mail.receivingBranchID;
                let senderID=mail.senderID;
                let receiverID=mail.receiverID;
                var OneMail = { mailID, addressID,isAssigned,isDelivered,lastAppearedBranchID,sourceBranchID,receivingBranchID,postManID,senderID,receiverID };
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
    async check(username){
        
        
        try{ 
            console.log(username);
            var result =await UserDAO.findUser(username);
            if(result){
                console.log(result);
                return true;
            }
            else{
                return false;
            }
        
        }catch(error){
            console.log("error when finding the user");
            return false;
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
                let moneyOrderID = moneyOrder._id;
                let specialCode = moneyOrder.specialCode;
                let amount =moneyOrder.amount;
                let sourceBranchID=moneyOrder.sourceBranchID;
                let receivingBranchID=moneyOrder.receivingBranchID;
                let senderID=moneyOrder.senderID;
                let receiverID=moneyOrder.receiverID;
                let isDelivered=moneyOrder.isDelivered;
                let isCancelled=moneyOrder.isCancelled;
           
                var OneMoneyOrder = {moneyOrderID,specialCode,amount,sourceBranchID,receivingBranchID,senderID,receiverID,isDelivered,isCancelled };
                moneyOrdersList.push(OneMoneyOrder);
                //console.log(OneMoneyOrder);
                
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
    async getMyReceivedMoneyOrdersList(userID){
        try {

            var moneyOrdersList = [];
            
            var moneyOrders = await MoneyOrderDAO.readAllEntityByReceiver(userID);
            //console.log(moneyOrders);
            moneyOrders.forEach(moneyOrder => {
                let moneyOrderID = moneyOrder._id;
                let specialCode = moneyOrder.specialCode;
                let amount =moneyOrder.amount;
                let sourceBranchID=moneyOrder.sourceBranchID;
                let receivingBranchID=moneyOrder.receivingBranchID;
                let senderID=moneyOrder.senderID;
                let receiverID=moneyOrder.receiverID;
                let isDelivered=moneyOrder.isDelivered;
                let isCancelled=moneyOrder.isCancelled;
           
                var OneMoneyOrder = {moneyOrderID,specialCode,amount,sourceBranchID,receivingBranchID,senderID,receiverID,isDelivered,isCancelled };
                moneyOrdersList.push(OneMoneyOrder);
                //console.log(OneMoneyOrder);
                
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
    async getSentCouriers(userID){
        try{
            var couriers = await CourierDAO.readAllEntityBySender(userID);
            return couriers;
        }catch(error){
            console.log("error when finding the couriers");
        }
    }
    async getReceivedCouriers(userID){
        try{
            var couriers = await CourierDAO.readAllEntityByReceiver(userID);
            return couriers;
        }catch(error){
            console.log("error when finding the couriers");
        }
    }
    async trackMyCourier(courierID){
        try{
            var courierDetail=await CourierDAO.readOneEntity(courierID);
            return courierDetail;
        }catch(error){
            console.log("No such named courier");
        }
    }
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