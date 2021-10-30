const config = require('../../config/DB');
const express=require('express');
const User=require('../user-model');
const   bcrypt = require("bcrypt");
class UserDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(userDetail){
        console.log('Creating anew user');

        try {
            const hashedPwd = await bcrypt.hash(userDetail.password, 12);
            console.log(hashedPwd);
            const user =await User.create({
                userName: userDetail.username,
                password: hashedPwd,
                addressId: userDetail.addressID,
                branchID:userDetail.branchID,
                mobileNumber:userDetail.phoneNumber,
                email:userDetail.email,
                
                status:true
              });
            //console.log(user);
    
            
            return user;
            // const insertResult = await User.create({
            //   username: userDetail.username,
            //   password: hashedPwd,
            // });
          } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server error occured");
          }



        
    }

    static async readAllEntitySent(){

    }
    static async readAllEntityReceived(){}

    static async readOneEntity(username){
        console.log(username+"logging in");
        const user =await User.findOne({userName: username,status:true});
        return user;
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = UserDAO;