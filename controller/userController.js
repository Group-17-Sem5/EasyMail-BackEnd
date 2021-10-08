const UserService = require('../services/userServices');
const Mail =require('../models/mail-model');
const userController={};
let userServices= new UserService();

userController.login= async (req, res, next) => {
    console.log('logging in');
    try {
        const state = await userServices.login(req.body);
        //console.log(state);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(state.err==0){
        const response = {
            err: 0,
            token: state.token,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            token: null,
            msg: state.msg
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
}
userController.register=async (req, res, next) => {
    console.log('registering new user');
    try {
        const state = await userServices.register(req.body);
        //console.log(state);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(state.err==0){
        const response = {
            err: 0,
            obj: state.token,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: state.msg
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

}

userController.changeAddress = async (req, res, next) => {
    console.log('Changing the address of '+req.body.username);
    try {
        const result = await userServices.changeMyAddress(req.body,req.params.oldAddress);
        console.log(result);
        if(result){
        const response = {
            err: 0,
            obj: {},//should get object list
            msg: "Address changed"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "Something went wrong"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
};
userController.searchReceivedMails= async (req, res, next) => {
    console.log('getting all received mails ');
    try {
        const received_mails = await userServices.getReceivedMailsList(req.params.userID);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(received_mails.length > 0){
        const response = {
            err: 0,
            mailModel: received_mails,//should get object list
            msg: "Successfully Found the details"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            mailModel: {},
            msg: "No Received Mails"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
    

};


userController.searchSentMails= async (req, res, next) => {
    console.log('getting all sent Mails');
    try {
        const sent_mails = await userServices.getSentMailsList(req.params.userID);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(sent_mails.length > 0){
        const response = {
            err: 0,
            mailModel: sent_mails,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            mailModel: {},
            msg: "No sent Mails"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
    

};

userController.getMoneyOrdersList = async (req, res, next) => {
    console.log('getting Money orders');
    try {
        const moneyOrders_list = await userServices.getMyMoneyOrdersList(req.params.userID);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(moneyOrders_list.length > 0){
        const response = {
            err: 0,
            obj: moneyOrders_list,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "No MoneyOrders Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

};
userController.trackCourier = async (req, res, next) => {
    console.log('Getting the details of the courier'+req.params.courierID);
    try {
        const result = await userServices.trackMyCourier(req.params.courierID);
        console.log(result);
        if(result['ok']===1){
        const response = {
            err: 0,
            obj: {},//should get object list
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
userController.getAPost= async (req, res, next) => {
    console.log('getting a post details');

    try {
        const mail = await userServices.getMail(req.params.mailID);
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
module.exports = userController;