const PostManDAO = require('../models/DAO/postManDAO');
const MailDAO= require('../models/DAO/mailDAO');
const AddressDAO= require('../models/DAO/addressDAO');
const mail= require('../models/mail-model');
const address= require('../models/address-model');
const config= require('../config/config');
const jwt=require('jsonwebtoken');
class PostManService{
    constructor(){

    }
    //methods 
    async getMailList(postManId) {
        try {

            var mailList = [];
            
            var mails = await MailDAO.readAllEntity(postManId);
            
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
    async getMail(mailId) {
        try {

            var mail = "";
            
            var mail = await MailDAO.readOneEntity(mailId);
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
           
            

            return OneMail;
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
    async confirmPostDelivery(mailID){
       try {
            var result = await MailDAO.updateOneEntity(mailID,true);
            //console.log(result);
            return result;
       } catch (error) {
        console.log('Error when confirming mail');
        }

    }
    async cancelPostDelivery(mailID){
        try {
            var result = await MailDAO.updateOneEntity(mailID,false);
            //console.log(result);
            return result;
       } catch (error) {
        console.log('Error when cancelling mail');
        }
    }
    async getAddressList(){
        try {

            var addressList = [];
            
            var addresses = await AddressDAO.readAllEntity();
            
            addresses.forEach(address => {
                //console.log(address);
                let addressID = address.addressID;
                let description = address.description;
                let location=address.location;
                let branchID=address.branchID;
                let userIDList = address.userIDList;

                var OneAddress = { addressID,location,description,userIDList,branchID };
                addressList.push(OneAddress);
            });

            return addressList;
        
            //    [
            //        {
            //            route_id:1,
            //            discription: Colombo,panadura
            //        },
            //             ..........
            //    ]

        } catch (error) {
            console.log('Error when finding Addresses');
        }

    }    
    async login(req) {
        try {

            var postMan = "";
            // var result=json();
            var postMan = await PostManDAO.readOneEntity(req.username);
                if(postMan){
                    //console.log(postMan);
                    if (postMan.password===req.password){
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
            //var OneMail = { mailID, addressID,isAssigned,isDelivered,lastAppearedBranch,sourceBranchID,receivingBranchID,postManID,senderID,receiverID };
            
            //return result;

            //return postMan;
            //    [
            //        {
            //            route_id:1,
            //            discription: Colombo,panadura
            //        },
            //             ..........
            //    ]

        } 
        catch (error) {
            console.log('Error when finding PostMan');
            return {
                err:1,
                msg:'Something wend wrong'
            };
        }

    }


}
module.exports = PostManService;