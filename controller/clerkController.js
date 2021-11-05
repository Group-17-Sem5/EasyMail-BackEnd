const clerkService = require('../services/clerkServices');
const Mail =require('../models/mail-model');
const clerkController={};
let clerkServices= new clerkService();


clerkController.searchAddress= async (req, res, next) => {
    console.log('getting all addresses');
    try {
        const address_list = await clerkServices.getAddressList();
        console.log(address_list.length);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(address_list.length > 0){
        const response = {
            err: 0,
            addresses: address_list,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            addresses: {},
            msg: "No Addresses Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
        next(err);
    }  
  
};
clerkController.addAddress = async (req, res, next) => {};
clerkController.removeAddress = async (req, res, next) => {};
clerkController.changeAddress = async (req, res, next) => {};
clerkController.confirmPostDelivery = async (req, res, next) => {};


/*clerkController.createClerk= async (req,res) => {
    const{ firstname, lastname, email, password } = req.body
    const password = randonId(10)
    const hashPassword = await bycrypt.hash(password,10)
    clerk.createClek(firstname, lastname, email, password)
    .then(result=>{
        res.json(result)
        SendMail(email,password)
    })
};*/
clerkController.getPosts = async (req, res, next) => {
    console.log('getting all mails');
    try {
        const mail_list = await clerkServices.getMailList();
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(mail_list.length > 0){
        const response = {
            err: 0,
            obj: mail_list,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "No Mails Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

};
clerkController.cancelDelivery = async (req, res, next) => {};
clerkController.getAPost= async (req, res, next) => {
    console.log('getting a post');

    try {
        const mail = await clerkServices.getMail(req.params.id);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(mail !== null){
        const response = {
            err: 0,
            obj: mail,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "No Mails Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

   
};
module.exports = clerkController;