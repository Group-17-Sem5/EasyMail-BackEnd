const config = require('../../config/DB');
const express=require('express');
const User=require('../user-model');
class UserDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(userDetail){
        console.log('Creating anew user');
        const user =await User.create({
            username: userDetail.username,
            password: userDetail.password,
            addressID: userDetail.addressID,
            branchID:userDetail.branchID,
            phoneNumber:userDetail.phoneNumber,
            addressDescription: userDetail.addressDescription,
            receivedPostIDList:[],
            sentPostIDList:[],
            sentMoneyOrdersList:[],
            receivedMoneyOrdersList:[]});
        //console.log(user);

        
        return user;
    }

    static async readAllEntitySent(){

    }
    static async readAllEntityReceived(){}

    static async readOneEntity(username){
        console.log(username+"logging in");
        const user =await User.findOne({username: username});
        return user;
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = UserDAO;