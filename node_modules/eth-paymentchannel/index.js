var eth = require("./ETH/eth")
var exports = module.exports = {};

//this sets the wallet to be used by all contract functions
exports.setETHWallet = (privateKey) => {
    return eth.createWallet(privateKey)
}

exports.open = (owner, recipient, value, delay, fee, gasLimit, deploying, callback, error) => {
    eth.createPaymentChannel(owner.privateKey, (contract, address, hash) => {
        //closeDuration
        console.log("boom")
        deploying(contract, address, hash)
        eth.contractDeployed(contract, delay, value, recipient, gasLimit, fee, () => {
            //successs
            callback(contract, address, hash)
        }, (err) => {
            //err
            error(err)
        })
    }, (err) => {
        //error
        error(err)
    })
}

exports.fund = (owner, channel, value, fee, gasLimit, callback, error) => {
    const wallet = eth.createWallet(owner.privateKey)
    const contract = eth.connectContract(channel, wallet)
    eth.makeDeposit(contract, value, gasLimit, fee, callback, error)
}

exports.claim = (owner, channel, value, signature, signer, callback, error) => {
    const wallet = eth.createWallet(owner.privateKey)
    const contract = eth.connectContract(channel, wallet)
    eth.makeClaim(contract, value, signature, signer, callback, error)
}

exports.closeChannel = (owner, channel, callback, error) => {
    const wallet = eth.createWallet(owner.privateKey)
    const contract = eth.connectContract(channel, wallet)
    eth.PaymentChannelClaimTimeout(contract, callback, error)
}

exports.willCloseChannel = (owner, channel, callback, error) => {
    const wallet = eth.createWallet(owner.privateKey)
    const contract = eth.connectContract(channel, wallet)
    eth.PaymentChannelSenderClose(contract, callback, error)
}

exports.sign = (wallet, value, channel, callback) => {
    var claim;
    var verified;

    claim = eth.utils.signMessage(eth.ethers.utils.parseEther(value, "ether"), channel, wallet.privateKey, callback)
    verified = eth.utils.verifySig(eth.ethers.utils.parseEther(value, "ether"), channel, claim, wallet.address)
    if (verified) {
        console.log("claim was verified")
        return claim
    }
}

exports.ethRecipientPaymentChannelClose = (owner, value, signature, signer, callback, error) => {
    const wallet = eth.createWallet(owner.privateKey)
    const contract = eth.connectContract(owner.receiving, wallet)
    eth.PaymentChannelClose(contract, value, signature, signer, callback, error)
}

exports.connectContract = eth.connectContract