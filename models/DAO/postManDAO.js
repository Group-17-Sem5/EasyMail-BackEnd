const config = require('../../config/DB');
const express=require('express');
const PostMan=require('../postMan-model');
class PostManDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntity(){

    }

    static async readOneEntity(username){
        console.log(username+"logging in");
        const postMan =await PostMan.findOne({username: username});
        return postMan;
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}
module.exports = PostManDAO;