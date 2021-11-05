const clerkDAO = require('../models/DAO/clerkDAO');
const MailDAO= require('../models/DAO/mailDAO')
const mail= require('../models/mail-model');
class ClerkService{
    constructor(){

    }
    //methods 
    async getAddressList(){
        
        //         var OneAddress = { addressID,location,description,userIDList,branchID,lat,lng };
        //         addressList.push(OneAddress);
        //     });

        //     return addressList;

        // } catch (error) {
        //     console.log('Error when finding Addresses');
        // }


        try {

            var addressList = [];
            
            var addresses = await AddressDAO.readAllEntity();
            
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

exports.createClerk = (firstname, lastname, email, password) =>{
    const clerk = new clerk({})
    return clerk.save()
}
module.exports = ClerkService;