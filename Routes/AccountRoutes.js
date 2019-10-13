var exports = module.exports = {};
var accountServices = require('../Services/AccountServices')

//const wallet = ETH.setETHWallet("0x676daa4a8b2fe6604a8f5d206c7f2706ff24711254b2491dda40751bb4c1f79d")

exports.newAccount = async (req, res) => {

    var channel = req.body.channel
    var address = req.body.address
    var ledger = req.body.ledger

    const account = {
        channel: channel,
        address: address,
        ledger: ledger
    }

    accountServices.saveAccount(account, (err, obj) => {
        console.log(obj)

    })
};








/*exports.fundETH = async (req, res) => {


};

exports.signClaimETH = async (req, res) => {


};


exports.infoETH = async (req, res) => {


};*/
