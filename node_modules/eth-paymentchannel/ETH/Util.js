var Web3 = require("web3");
var abi = require('ethereumjs-abi')
var ethereumjs = require("ethereumjs-util")
var server = "http://localhost:8545"
var provider = new Web3.providers.HttpProvider(server);
const web3 = new Web3(provider);

var exports = module.exports = {};

const signMessage = function(value, channel, privateKey) {
    var hash = constructPaymentMessage(value, channel)
    const sig = web3.eth.accounts.sign(hash, privateKey)
    return sig.signature
}

const verifySig = function(value, channel, signature, address) {
    const isValid = isValidSignature(value, channel, signature, address)
    console.log("checking if signiture is valid")
    console.log(isValid)
    return isValid
}

function constructPaymentMessage(value,channel) {
    console.log("||||||||||||||||||||||||||||||||||||||")
    console.log(channel)
    console.log(value)
    console.log("||||||||||||||||||||||||||||||||||||||")
    const hash = web3.utils.soliditySha3({type: 'uint256', value: value},{type: 'address', value: channel})
    return hash
}

function prefixed(hash) {
    return abi.soliditySHA3(
        ["string", "bytes32"],
        ["\x19Ethereum Signed Message:\n32", hash]
    );
}

function recoverSigner(message, signature) {
    var split = ethereumjs.fromRpcSig(signature);
    var publicKey = ethereumjs.ecrecover(message, split.v, split.r, split.s);
    var signer = ethereumjs.pubToAddress(publicKey).toString("hex");
    return signer;
}

function isValidSignature(value, channel, signature, expectedSigner) {
    var message = prefixed(constructPaymentMessage(value, channel));
    var signer = recoverSigner(message, signature);
    return signer.toLowerCase() ==
        ethereumjs.stripHexPrefix(expectedSigner).toLowerCase();
}

exports.signMessage = signMessage
exports.verifySig = verifySig
exports.server = server