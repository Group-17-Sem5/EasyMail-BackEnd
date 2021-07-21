const PostManDAO = require('../models/DAO/postManDAO');
const MailDAO= require('../models/DAO/mailDAO')
const mail= require('../models/mail-model');
class PostManService{
    constructor(){

    }
    //methods 
    async getMailList() {
        try {

            var mailList = [];
            
            var mails = await MailDAO.readAllEntity();
            
            mails.forEach(mail => {
                let mailID = mail.mailID;
                let discription = mail.discription;
                let status= mail.status;
                let location =mail.location;
                let postManID=mail.postManID;
                var OneMail = { mailID, discription,status,location,postManID };
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
                let discription = mail.discription;
                let status= mail.status;
                let location =mail.location;
                let postManID=mail.postManID;
                var OneMail = { mailID, discription,status,location,postManID };
            

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


}
module.exports = PostManService;