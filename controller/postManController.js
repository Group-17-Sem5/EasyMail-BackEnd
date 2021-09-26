const PostManService = require('../services/postManServices');
const Mail =require('../models/mail-model');
const postManController={};
let postManServices= new PostManService();

postManController.login= async (req, res, next) => {
    console.log('logging in');
    try {
        const state = await postManServices.login(req.body);
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
postManController.searchAddress= async (req, res, next) => {
    console.log('getting all addresses');
    try {
        const address_list = await postManServices.getAddressList();
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(address_list.length > 0){
        const response = {
            err: 0,
            obj: address_list,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "No Addresses Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
    

};
postManController.getOneAddress = async (req, res, next) => {
    console.log("getting the address");
    try{
        const address=await postManServices.getOneAddress(req.params.addressID);
        if(address==null){
            const response = {
                err: 1,//should get object list
                msg: "no address found"
            }
            return res.json(response);
            }else{
            const response = {
                err: 0,
                obj:address,
                msg: "Address found successfully"
            }
            return res.json(response);
            }
    }catch (err) {
        next(err);
    }
};
postManController.addAddress = async (req, res, next) => {
    console.log("adding a new address...");
    try {
        const state = await postManServices.addAddress(req.body);
        //console.log(state);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(state.err==0){
        const response = {
            err: 0,
            obj: state.obj,//should get object list
            msg: "successfully added"
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
};
postManController.removeAddress = async (req, res, next) => {
    console.log("removing the address");
    try {
        const state = await postManServices.removeAddress(req.body);
        //console.log(state);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(state.err==0){
        const response = {
            err: 0,
            obj: state.obj,//should get object list
            msg: "successfully removed"
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
};
postManController.changeAddress = async (req, res, next) => {
    console.log('changing the address location');
    try {
        const state = await postManServices.changeAddress(req.body);
        //console.log(state);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(state.err==0){
        const response = {
            err: 0,
            obj: state.obj,//should get object list
            msg: "successfully changed"
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
};





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
postManController.confirmPostDelivery = async (req, res, next) => {
    console.log('Confirming the post delivery'+req.params.id);
    try {
        const result = await postManServices.confirmPostDelivery(req.params.id);
        console.log(result);
        if(result['ok']===1){
        const response = {
            err: 0,
            obj: {},//should get object list
            msg: "Successfully confirmed the post"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "Something wrong with the confirming"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
};
postManController.cancelDelivery = async (req, res, next) => {
    console.log('Cancelling the post delivery'+req.params.id);
    try {
        const result = await postManServices.cancelPostDelivery(req.params.id);
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
            msg: "Something wrong with the cancelling delivery"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
};
postManController.getAPost= async (req, res, next) => {
    console.log('getting a post');

    try {
        const mail = await postManServices.getMail(req.params.id);
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