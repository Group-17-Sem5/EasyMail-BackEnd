const PostManDAO = require('../models/DAO/postManDAO');
const MailDAO= require('../models/DAO/mailDAO');
const AddressDAO= require('../models/DAO/addressDAO');
const CourierDAO= require('../models/DAO/courierDAO');
const QueryDAO=require('../models/DAO/queryDAO');
const mail= require('../models/mail-model');
const address= require('../models/address-model');
const config= require('../config/config');
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
class PostManService{
    constructor(){

    }
    //methods 
    async login(req) {
        try {

            var postMan = "";
            // var result=json();
            var postMan = await PostManDAO.readOneEntity(req.username);
            // console.log(req.username);
            
                if(postMan){
                    //console.log(postMan);
                    const cmp = await bcrypt.compare(req.password, postMan.password);
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
            console.log('Error when finding PostMan');
            return {
                err:1,
                msg:'Something wend wrong'
            };
        }

    }



    async getMailList(postManId) {
        try {

            var mailList = [];
            
            var mails = await MailDAO.readAllEntity(postManId);
            
            mails.forEach(mail => {
                let mailID=mail._id;
                let addressID = mail.addressID;
                let isAssigned= mail.isAssigned;
                let isDelivered =mail.isDelivered;
                let postManID=mail.postManID;
                let lastAppearedBranchID = mail.lastAppearedBranchID;
                let sourceBranchID=mail.sourceBranchID;
                let receivingBranchID=mail.receivingBranchID;
                let senderID=mail.senderID;
                let receiverID=mail.receiverID;
                let isCancelled=mail.isCancelled;
                var OneMail = { mailID, addressID,isAssigned,isDelivered,lastAppearedBranchID,sourceBranchID,receivingBranchID,postManID,senderID,receiverID,isCancelled };
                mailList.push(OneMail);
            });

            return mailList;
        } catch (error) {
            console.log('Error when finding mail');
        }

    }
    
    async getDeliveredMailList(postManId) {
        try {

            var mailList = [];
            
            var mails = await QueryDAO.readAllDeliveredMailEntity(postManId);
            
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
                let isCancelled=mail.isCancelled;
                var OneMail = {mailID,addressID,isAssigned,isDelivered,lastAppearedBranchID,sourceBranchID,receivingBranchID,postManID,senderID,receiverID,isCancelled };
                mailList.push(OneMail);
            });

            return mailList;
        } catch (error) {
            console.log('Error when finding mail');
        }

    }
    
    async getCancelledMailList(postManId) {
        try {

            var mailList = [];
            
            var mails = await QueryDAO.readAllCancelledMailEntity(postManId);
            
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
                let isCancelled=mail.isCancelled;
                var OneMail = {mailID,addressID,isAssigned,isDelivered,lastAppearedBranchID,sourceBranchID,receivingBranchID,postManID,senderID,receiverID,isCancelled };
                mailList.push(OneMail);
            });

            return mailList;
        } catch (error) {
            console.log('Error when finding mail');
        }

    }
    async getMail(mailId) {
        try {
            var mail = await MailDAO.readOneEntity(mailId);
            let mailID=mail._id;
            let addressID = mail.addressID;
            let isAssigned= mail.isAssigned;
            let isDelivered =mail.isDelivered;
            let postManID=mail.postManID;
            let lastAppearedBranchID = mail.lastAppearedBranchID;
            let sourceBranchID=mail.sourceBranchID;
            let receivingBranchID=mail.receivingBranchID;
            let senderID=mail.senderID;
            let receiverID=mail.receiverID;
            let isCancelled=mail.isCancelled;
            var OneMail = {mailID,addressID,isAssigned,isDelivered,lastAppearedBranchID,sourceBranchID,receivingBranchID,postManID,senderID,receiverID,isCancelled };
           
            return OneMail;

        } catch (error) {
            console.log('Error when finding mail');
        }

    }
    async confirmPostDelivery(mailID){
       try {
            var result = await MailDAO.updateOneEntity(mailID,true);
            //console.log(result);
            return {ok:1,result:result,msg:"successful"};
       } catch (error) {
        console.log('Error when confirming mail');
            return {ok:0,result:null,msg:"Something went wrong"};
        }

    }
    async cancelPostDelivery(mailID){
        try {
            var result = await MailDAO.cancelOneEntity(mailID);
            //console.log(result);
            return {    err:0,
                        result:result,
                     msg:"successfully updated"};
       } catch (error) {
        console.log('Error when cancelling mail');

        return { err:1,result:null,msg:"error when finding that mail"};
        }
    }




    async getCourierList(postManId) {
        try {
            
            var couriers = await CourierDAO.readAllEntityByPostMan(postManId);
            
       
            return couriers;
        } catch (error) {
            console.log('Error when finding couriers');
        }

    }
    async getDeliveredCourierList(postManId) {
        try {
            
            var couriers = await CourierDAO.readDeliveredEntityByPostMan(postManId);
            
       
            return couriers;
        } catch (error) {
            console.log('Error when finding couriers');
        }

    }
    async getCancelledCourierList(postManId) {
        try {
            
            var couriers = await CourierDAO.readCancelledEntityByPostMan(postManId);
            
       
            return couriers;
        } catch (error) {
            console.log('Error when finding couriers');
        }

    }
    async confirmCourierDelivery(courierID){
        try {
             var result = await CourierDAO.confirmOneEntity(courierID,true);
             //console.log(result);
             return {ok:1,result:result,msg:"successful"};
        } catch (error) {
         console.log('Error when confirming courier');
             return {ok:0,result:null,msg:"Something went wrong"};
         }
 
     }
     async cancelCourierDelivery(courierID){
         try {
             var result = await CourierDAO.cancelOneEntity(courierID);
             //console.log(result);
             return {    err:0,
                         result:result,
                      msg:"successfully updated"};
        } catch (error) {
         console.log('Error when cancelling courier');
 
         return { err:1,result:null,msg:"error when finding that courier"};
         }
     }
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
    async getBranch(username){
        try{
            const postman= await PostManDAO.readOneEntity(username);
            
            return {
                err:0,
                branchID:postman.branchId,
                msg:"result found"
            };
        }catch (error) {
            console.log('Error when finding the postman');
            return {
                err:1,
                branchID:null,
                msg:'Something wend wrong'
            };
        }
    }    
    async getOneAddress(addressID){
        try{
            var address= await AddressDAO.readOneEntity(addressID);
            return {
                err:0,
                obj:address
            };
        }catch (error) {
            console.log('Error when finding the address');
            return {
                err:1,
                msg:'Something wend wrong'
            };
        }
    }    
    
    async addAddress(details){
        try{
            var address= await AddressDAO.createOneEntity(details);
            return {
                err:0,
                obj:address,
                msg:"Successful"
            
            };
        }catch (error) {
            console.log('Error when adding the address');
            return {
                err:1,
                obj:"null",
                msg:'Something wend wrong'
            };
        }
    }
    async removeAddress(addressID){
        try{
            var address=await AddressDAO.deleteOneEntity(addressID);
            return{
                err:0,
                obj:address,
                msg:"Successful"
            };
        }catch (error) {
            console.log('Error when finding address');
            return {
                err:1,
                obj:"",
                msg:'Something wend wrong'
            };
        }
    }
    async changeAddress(details){
        try{
            var res=await AddressDAO.updateOneEntity(details);
            if (res.ok==0){
                return{
                    err:1,
                    msg:'there is no address in that name'
                }
            }else{
                return{
                err:0,
                msg:"Successfully updated"
                };
            }
            
        }catch (error) {
            console.log('Error when finding address');
            return {
                err:1,
                msg:'Something went wrong'
            };
        }
    }
    async updateAddress(id,details){
        try{
            var res=await AddressDAO.updateAddress(id,details);
            if (res.ok==0){
                return{
                    err:1,
                    msg:'there is no address in that name'
                }
            }else{
                return{
                err:0,
                msg:"Successfully updated"
                };
            }
            
        }catch (error) {
            console.log('Error when finding address');
            return {
                err:1,
                msg:'Something went wrong'
            };
        }
    }


}
module.exports = PostManService;