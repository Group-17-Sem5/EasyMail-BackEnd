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

    static async createOneEntity(){

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