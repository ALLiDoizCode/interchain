const ETH = require('eth-paymentchannel');
const XRP = require('xrp-paymentchannel');
const accountServices = require("./AccountServices")

const getChannel = (destination, ledger, value, callback) => {
    //check if channel for destination exist
    //if it doesn't make one
    //if it does fund it
    const channel = "channel id"
    const tx = "tx id"

    callback(channel, tx)
}


const newTransaction = (ledger, value, channel) => {
    const wallet//nodes wallet
    switch (ledger) {
        case "xrp":
            const sig = XRP.sign(wallet, value, channel)
            return sig
            break;
        case "eth":
            const sig = ETH.sign(wallet, value, channel)
            return sig
            break;
        default:
        // code block
    }
}

const verifyClaim = (ledger, AccountId, sig, claim) => {

    accountServices.findAccount(AccountId, (err, obj) => {
        if (err) return console.error(err);
        switch (ledger) {
            case "xrp":
                const isverified = XRP.verifyClaim(claim, sig, obj.address)
                return isverified
                break;
            case "eth":
                const isverified = ETH.verifyClaim(claim, sig, obj.address)
                return isverified
                break;
            default:
            // code block
        }
    })
}