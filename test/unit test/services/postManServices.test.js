
const PostManServices =require("../../../services/postManServices");
describe("postman Services",()=>{
    let postManServices= new PostManServices();
    it("should return the token when login",async ()=>{
        
        const response = await postManServices.login({username:"postMan002",password:"post123"});
        expect (response.token).toBeDefined();
    });
    it("should return mails list",async ()=>{
        
        const response = await postManServices.getMailList("postMan002");
        expect (response.length).toBeGreaterThanOrEqual(0);
    });
    it("should return the Delivered Mails",async ()=>{
        
        const response = await postManServices.getDeliveredMailList("postMan002");
        expect (response.length).toBeGreaterThanOrEqual(0);
    });
    it("should return the cancelled mails list",async ()=>{
        
        const response = await postManServices.getCancelledMailList("postMan002");
        expect (response.length).toBeGreaterThanOrEqual(0);
    });
    it("should confirm the post delivery",async ()=>{
        
        const response = await postManServices.confirmPostDelivery("Normal002");
        expect (response.ok).toBeDefined();
    });
    it("should cancel the post delivery",async ()=>{
        
        const response = await postManServices.cancelPostDelivery("Normal002");
        expect (response.err).toBeDefined();
    });
    it("should get the all addresses",async ()=>{
        
        const response = await postManServices.getAddressList();
        expect (response.length).toBeGreaterThanOrEqual(0);
    });
    it("should add a new address",async ()=>{
        
        const response = await postManServices.addAddress({addressID:"address1",lat:"80.25256",lng:"5.22565",description:"no 20"});
        expect (response.obj).toBeDefined();
    });
    it("should remove an address",async ()=>{
        
        const response = await postManServices.removeAddress({addressID:"address1",lat:"80.25256",lng:"5.22565",description:"no 20"});
        expect (response.obj).toBeDefined();
    });
    it("should change an address",async ()=>{
        
        const response = await postManServices.changeAddress({addressID:"address1",lat:"80.25256",lng:"5.22565",description:"no 20"});
        expect (response.err).toBeDefined();
    });
});