const UserServices =require("../../../services/userServices");
 describe("UserServices", ()=>{
     let userServices=new UserServices();
    it("should login as a user",async()=>{
        var result =await userServices.login({username:"Kamal002",password:"post123"});
        expect(result).toBeDefined();
    });
 });