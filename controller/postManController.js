
const postManController={};

postManController.searchAddress= async (req, res, next) => {
    console.log('addresses');
    return res.json('searchinng address');

};
postManController.addAddress = async (req, res, next) => {};
postManController.removeAddress = async (req, res, next) => {};
postManController.confirmPostDelivery = async (req, res, next) => {};

module.exports = postManController;