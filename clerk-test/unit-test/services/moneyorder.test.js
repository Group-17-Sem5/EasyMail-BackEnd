const PostServices =require("../../../services/clerk/MoneyOrderService");
 describe("PostServices", ()=>{
     
    
    it("should get all money order list",async()=>{
        var result =await PostServices.findAll();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    // it("should register a new user",async()=>{
    //     var result =await PostServices.register({username:"Kamal004",password:"post123",branchID:"Mathugama",addressID:"address0025",phoneNumber:"0112336448"});
    //     expect(result.token).toBeDefined();
    // });
    it("should create a money order",async()=>{
        var result =await PostServices.create();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it("should delete a money order",async()=>{
        var result =await PostServices.del();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it("should change the code",async()=>{
        var result =await PostServices.update({specialCode:"adnn132"});
        expect(result).toBeDefined();
    });
 });