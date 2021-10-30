const PostManService = require('../services/postManServices');
const Mail =require('../models/mail-model');
const postManController={};
let postManServices= new PostManService();

postManController.login= async (req, res,next) => {
    console.log('logging in');
    try {
        const state = await postManServices.login(req.body);

        
        
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
    //next(err);
    }
}
postManController.searchAddress= async (req, res, next) => {
    console.log('getting all addresses');
    try {
        const address_list = await postManServices.getAddressList();
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
    console.log(req.body);
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
        const state = await postManServices.removeAddress(req.params.id);
        console.log(req.params.id);
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
            msg: "Error when removing the address"
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
            obj:{},//should get object list
            msg: "successfully changed"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "Cannot change"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
};
postManController.updateAddress = async (req, res, next) => {
    console.log('changing the address ');
    try {
        const state = await postManServices.updateAddress(req.params.id,req.body);
        //console.log(state);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(state.err==0){
        const response = {
            err: 0,
            obj:{},//should get object list
            msg: "successfully changed"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "Cannot change"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }
};






postManController.getPosts = async (req, res, next) => {
    console.log('getting all mails');
    //console.log(req.params.postManId);
    try {
        const mail_list = await postManServices.getMailList(req.params.postManId);
        console.log(mail_list.length);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(mail_list.length > 0){
        const response = {
            err: 0,
            mailModel: mail_list,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            mailModel: {},
            msg: "No Mails Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

};

postManController.getDeliveredPosts = async (req, res, next) => {
    console.log('getting Delivered mails');
    //console.log(req.params.postManId);
    try {
        const mail_list = await postManServices.getDeliveredMailList(req.params.postManId);
        console.log(mail_list.length);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(mail_list.length > 0){
        const response = {
            err: 0,
            mailModel: mail_list,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            mailModel: {},
            msg: "No Mails Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

};

postManController.getCancelledPosts = async (req, res, next) => {
    console.log('getting cancelled mails');
    //console.log(req.params.postManId);
    try {
        const mail_list = await postManServices.getCancelledMailList(req.params.postManId);
        console.log(mail_list.length);
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(mail_list.length > 0){
        const response = {
            err: 0,
            mailModel: mail_list,//should get object list
            msg: ""
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            mailModel: {},
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
            if (result.result.modifiedCount==0){
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "Already in the delivered Status"
                }
                return res.json(response);
            }else{
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "Successfully confirmed the post"
                }
                return res.json(response);
            }
        
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
        if(result.err==0){

            if (result.result.modifiedCount==1){
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "cancelled the delivery"
                };
                return res.json(response);
            }else{
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "Already in cancelled status"
                };
                return res.json(response);
            }

        
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "Something wrong with the cancelling delivery"
        };return res.json(response);
        
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



postManController.getCouriers = async (req, res, next) => {
    console.log('getting all assigned couriers');
    //console.log(req.params.postManId);
    try {
        const courier_list = await postManServices.getCourierList(req.params.postManId);
        console.log(courier_list.length+" results found");
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(courier_list.length > 0){
        const response = {
            err: 0,
            couriers: courier_list,//should get object list
            msg: "Couriers Found"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            couriers: {},
            msg: "No Couriers Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

};

postManController.getDeliveredCouriers = async (req, res, next) => {
    console.log('getting Delivered couriers');
    //console.log(req.params.postManId);
    try {
        const courier_list = await postManServices.getDeliveredCourierList(req.params.postManId);
        console.log(courier_list.length+" results found");
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(courier_list.length > 0){
        const response = {
            err: 0,
            couriers: courier_list,//should get object list
            msg: "Couriers Found"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            couriers: {},
            msg: "No Couriers Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

};

postManController.getCancelledCouriers = async (req, res, next) => {
    console.log('getting cancelled Couriers');
    //console.log(req.params.postManId);
    try {
        const courier_list = await postManServices.getCancelledCourierList(req.params.postManId);
        console.log(courier_list.length+" results found");
        //const mail_list= [{"email":"sfg","df":"df"}];
        if(courier_list.length > 0){
        const response = {
            err: 0,
            couriers: courier_list,//should get object list
            msg: "Couriers found"
        }
        return res.json(response);
        }else{
        const response = {
            err: 1,
            couriers: {},
            msg: "No Couriers Available"
        }
        return res.json(response);
        }
        
    } catch (err) {
    next(err);
    }

};
postManController.confirmCourierDelivery = async (req, res, next) => {
    console.log('Confirming the courier delivery'+req.params.id);
    try {
        const result = await postManServices.confirmCourierDelivery(req.params.id);
        console.log(result);
        if(result['ok']===1){
            if (result.result.modifiedCount==0){
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "Already in the delivered Status"
                }
                return res.json(response);
            }else{
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "Successfully confirmed the Courier"
                }
                return res.json(response);
            }
        
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
postManController.cancelCourierDelivery = async (req, res, next) => {
    console.log('Cancelling the courier delivery'+req.params.id);
    try {
        const result = await postManServices.cancelCourierDelivery(req.params.id);
        console.log(result);
        if(result.err==0){

            if (result.result.modifiedCount==1){
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "cancelled the delivery"
                };
                return res.json(response);
            }else{
                const response = {
                    err: 0,
                    obj: {},//should get object list
                    msg: "Already in cancelled status"
                };
                return res.json(response);
            }

        
        }else{
        const response = {
            err: 1,
            obj: {},
            msg: "Something wrong with the cancelling delivery"
        };return res.json(response);
        
        }
        
    } catch (err) {
    next(err);
    }
};
module.exports = postManController;