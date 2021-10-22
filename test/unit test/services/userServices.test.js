const UserServices =require("../../../services/userServices");
 describe("UserServices", ()=>{
     let userServices=new UserServices();
    it("should login as a user",async()=>{
        var result =await userServices.login({username:"Kamal02",password:"post123"});
        expect(result).toBeDefined();
    });
    it("should get received mail list",async()=>{
        var result =await userServices.getReceivedMailsList("Kamal02");
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    // it("should register a new user",async()=>{
    //     var result =await userServices.register({username:"Kamal004",password:"post123",branchID:"Mathugama",addressID:"address0025",phoneNumber:"0112336448"});
    //     expect(result.token).toBeDefined();
    // });
    it("should get Sent mails list",async()=>{
        var result =await userServices.getSentMailsList("Kamal02");
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it("should get moneyOrders List",async()=>{
        var result =await userServices.getMyMoneyOrdersList("Kamal02");
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it("should change the user address",async()=>{
        var result =await userServices.changeMyAddress({addressID:"newAddressID",lat:60.225,lng:5.2236,description:"Katu Road ,Kaluthara"},"oldAddress");
        expect(result).toBeDefined();
    });
 });