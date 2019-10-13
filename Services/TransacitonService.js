const ETH = require('eth-paymentchannel');
const XRP = require('xrp-paymentchannel');
const accountServices = require("./AccountServices")
const currency = require("./CurrencyService")

const getChannel = (ledger, destination, value, callback) => {
    //check if channel for destination exist
    //if it doesn't make one
    //if it does fund it
    const wallet//nodes wallet
    accountServices.findDestination(destination, (err, obj) => {
        if (err) return console.error(err);
        if (obj != undefined && obj != null) {
            callback(obj.channel, obj.hash)
        } else {
            switch (ledger) {
                case "xrp":
                    getValue(value, "xrp", (amount) => {
                        XRP.open(wallet, destination, amount, 60, "50000", (obj) => {
                            const hash = obj.result.hash
                            callback(hash)
                        }, (error) => {

                        })
                    })
                    break;
                case "eth":
                    getValue(value, "eth", (amount) => {
                        ETH.open(wallet, destination, amount, 60, 20000000000, 4712388, (contract, address, hash) => {
                            callback(hash, address)
                        }, (contract, address, hash) => {
                            console.log(address)
                            console.log(hash)
                        }, (err) => {
                            error(err)
                            console.log(err)
                        })
                    })
                    break;
                default:
            }
        }
    })
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

const getValue = (value, currency, callback) => {
    currency.find((obj) => {
        var result = jsObjects.find(obj => {
            return obj.currency === currency
        })

        let amount = parseFloat(result.last_price) * parseFloat(value)
        callback(amount.toString())

    })
}