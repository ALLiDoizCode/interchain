var app = require("./contracts/SBCPaymentChannel.json");
const ethers = require('ethers');
const utils = require('./Util');
let httpProvider = new ethers.providers.JsonRpcProvider(utils.server, 'ropsten');
var exports = module.exports = {};
var currentWallet;

const createWallet = function (privateKey) {
    currentWallet = new ethers.Wallet(privateKey, httpProvider);
    return new ethers.Wallet(privateKey, httpProvider);
}

const connectContract = (contractAddress, wallet) => {
    let contract = new ethers.Contract(contractAddress, app.abi, httpProvider);
    let contractWithSigner = contract.connect(wallet);
    return contractWithSigner
}

const createPaymentChannel = function (privateKey, success, error) {
    const wallet = createWallet(privateKey)
    //console.log(wallet)
    let factory = new ethers.ContractFactory(app.abi, app.bytecode, wallet);
    factory.deploy().then((contract) => {
        success(contract, contract.address, contract.deployTransaction.hash)
    }).catch(error)
}

const contractDeployed = function (contract, closeDuration, value, recipient, gasLimit, gasPrice, success, error) {
    contract.deployed().then(() => {
        console.log("Done! The contract is deployed.");
        // Done! The contract is deployed.
        setContractEmitters(contract, recipient)
        openPaymentChannel(contract, recipient, closeDuration, value, gasLimit, gasPrice, success, error)
        success()
    }).catch(error)
}

const makeClaim = function (contract, amount, signature, signer, success, error) {
    const claimAmount = ethers.utils.parseEther(amount, "ether")
    if (utils.verifySig(claimAmount, contract.address, signature, signer)) {
        console.log("signature is valid")
        claimPayment(contract, claimAmount, signature, success, error)
    } else {
       // console.log("signature is not valid")
        //error("signature is not valid")
    }
}

const openPaymentChannel = function (contract, recipient, closeDuration, amount, gasLimit, gasPrice, success, error) {
    let overrides = {

        // The maximum units of gas for the transaction to use
        gasLimit: gasLimit,

        // The price (in wei) per unit of gas
        gasPrice: gasPrice,

        // The nonce to use in the transaction
        //nonce: 123,

        // The amount to send with the transaction (i.e. msg.value)
        value: ethers.utils.parseEther(amount, 'ether'),

        // The chain ID (or network ID) to use
        //chainId: 1

    };
    contract.PaymentChannel(recipient, closeDuration, overrides).then((result) => {
        console.log("//////Created PaymentChannel//////")
        success(result)
    }).catch(error)
}

const PaymentChannelSenderClose = function (contract, success, error) {
    setContractEmitters(contract, "")
    contract.startSenderClose().then((result) => {
        console.log("//////Will Close PaymentChannel//////")
        success(result)
    }).catch(error)
}

const PaymentChannelClaimTimeout = function (contract, success, error) {
    setContractEmitters(contract, "")
    contract.claimTimeout().then((result) => {
        console.log("//////PaymentChannel closed//////")
        success(result)
    }).catch(error)
}

const PaymentChannelClose = function (contract, amount, signature, signer, success, error) {
    setContractEmitters(contract, "")
    const claimAmount = ethers.utils.parseEther(amount, "ether")
    if (utils.verifySig(claimAmount, contract.address, signature, signer)) {
        console.log("signature is valid")
        contract.close(claimAmount, signature).then((result) => {
            console.log("//////PaymentChannel closed//////")
            success(result)
        }).catch(error)
    } else {
        console.log("signature is not valid")
        error("signature is not valid")
    }
}

const makeDeposit = function (contract, amount, gasLimit, gasPrice, success, error) {
    let overrides = {

        // The maximum units of gas for the transaction to use
        gasLimit: gasLimit,

        // The price (in wei) per unit of gas
        gasPrice: gasPrice,

        // The nonce to use in the transaction
        //nonce: 123,

        // The amount to send with the transaction (i.e. msg.value)
        value: ethers.utils.parseEther(amount, 'ether'),

        // The chain ID (or network ID) to use
        //chainId: 1

    };
    setContractEmitters(contract, "0xd85afdd035bf23e240c87cc1dbe98ec980da059b")
    contract.deposit(overrides).then((result) => {
        console.log("//////Deposited PaymentChannel//////")
        success(result)
    }).catch(error)

}

const claimPayment = function (contract, value, signature, success, error) {
    setContractEmitters(contract, currentWallet.signingKey.address)
    contract.claim(value, signature).then((result) => {
        console.log("//////Submitted Claim//////")
        success(result)
    }).catch(error)
}

function setContractEmitters(contract, currentRecipient) {
    contract.on("PaymentChannelChanged", (sender, recipient, wei, event) => {
        console.log("sender: " + sender);
        console.log("recipient: " + recipient.toLowerCase());
        console.log("recipient Verified " + (currentRecipient.toLowerCase() == recipient.toLowerCase()))
        console.log("funded: " + ethers.utils.formatEther(wei, 'ether'));
    });
    contract.on("PaymentChannelClaim", (senderAddress, amountAuthorized, signature, signer, sender, underflow, wei, event) => {
        console.log("senderAddress: " + senderAddress);
        console.log("amountAuthorized: " + ethers.utils.formatEther(amountAuthorized, 'ether'));
        console.log("signature: " + signature);
        console.log("signer: " + signer);
        console.log("sender: " + sender);
        console.log("underflow: " + underflow);
        console.log("claimed: " + ethers.utils.formatEther(wei, 'ether'));
    });

    contract.on("PaymentChannelDeposit", (wei, event) => {
        console.log("Deposited: " + ethers.utils.formatEther(wei, 'ether'));
    });

    contract.on("PaymentChannelWillClose", (expiration, event) => {
        console.log("will close in: " + expiration);
    });

    contract.on("PaymentChannelClose", (isClose, event) => {
        console.log("Channel closed : " + isClose);
    });
}

exports.createWallet = createWallet
exports.createPaymentChannel = createPaymentChannel
exports.contractDeployed = contractDeployed
exports.makeClaim = makeClaim
exports.PaymentChannelSenderClose = PaymentChannelSenderClose
exports.PaymentChannelClaimTimeout = PaymentChannelClaimTimeout
exports.PaymentChannelClose = PaymentChannelClose
exports.makeDeposit = makeDeposit
exports.utils = utils
exports.ethers = ethers
exports.connectContract = connectContract