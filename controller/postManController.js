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
        const mail_list = await postManServices.getMailList();
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
   Mail.findOne({mailID: req.params.ID},(err, result) => {
        if(err) res.status(500).json({msg: err});
        res.json({data: result,mailID: req.params.ID});
   });
};
module.exports = postManController;