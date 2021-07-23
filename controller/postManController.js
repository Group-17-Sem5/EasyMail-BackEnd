const PostManService = require('../services/postManServices');
const Mail =require('../models/mail-model');
const postManController={};
let postManServices= new PostManService();


postManController.searchAddress= async (req, res, next) => {
    

};
postManController.addAddress = async (req, res, next) => {};
postManController.removeAddress = async (req, res, next) => {};
postManController.changeAddress = async (req, res, next) => {};
postManController.confirmPostDelivery = async (req, res, next) => {};

postManController.getPosts = async (req, res, next) => {
    console.log('getting all mails');
    try {
        const mail_list = await postManServices.getMailList(req.params.postManId);
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
postManController.cancelDelivery = async (req, res, next) => {};
postManController.getAPost= async (req, res, next) => {
    console.log('getting a post');

    try {
        const mail = await postManServices.getMail(req.params.id);
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
module.exports = postManController;