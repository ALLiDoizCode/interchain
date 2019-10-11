const paymentChannel = require("./index")

var Alice = {

    eth: {
        privateKey: "0xf87591cd980b91f16d9e3815deabb7ee99bdf589b8f9c05684dae3a05e5fb0ae",
        address: "0x3a6dbb063dafb48e93228a96cb7390bac7fbaf25",
        receiving: "",
        sending: "0x3Eb061804e064cf7c2BFC916c11d841812E5186f"
    }

}

//Bob
var Bob = {

    eth: {
        privateKey: "0xc8b46aa940b2f66019cfdfac65099a08d66ea7e44d27b3879dc98d1db949d5db",
        address: "0xf6ebe921a8f37d155be377b68a74c7686bf267cc",
        receiving: "0x3Eb061804e064cf7c2BFC916c11d841812E5186f",
        sending: ""
    }

}

//connect to existing contract
/*const wallet = paymentChannel.setETHWallet(Alice.eth.privateKey)
console.log(wallet.signingKey.address)
const contract = paymentChannel.connectContract(Alice.eth.receiving, wallet)
console.log(contract)*/

//open
/*paymentChannel.open(Alice.eth, Bob.eth.address, "1.235486", 60, 20000000000, 4712388, (contract, address, hash) => {
    Alice.sending = address
    Bob.receiving = address
}, (contract, address, hash) => {
    console.log(address)
    console.log(hash)
}, (err) => {
    error(err)
    console.log(err)
})*/

//fund
/*paymentChannel.fund(Alice.eth, Alice.eth.sending, "1.0", 100000000000, 4712388, (obj) => {
    console.log(obj)
}, (error) => {
    console.log(error)
})*/

//sign
/*const sig = paymentChannel.sign(Alice.eth, "1.0", Alice.eth.sending)
console.log(sig)*/

//claim
/*paymentChannel.claim(Bob.eth, Bob.eth.receiving, "1.0", sig, Alice.eth.address, (obj) => {
    console.log(obj)
}, (error) => {
    console.log(error)
})*/

/*paymentChannel.willCloseChannel(Alice.eth, Alice.eth.sending, (obj) => {
    console.log(obj)
}, (error) => {
    console.log(error)
})*/

/*paymentChannel.closeChannel(Alice.eth, Alice.eth.sending, (obj) => {
    console.log(obj)
}, (error) => {
    console.log(error)
})*/

/*paymentChannel.ethRecipientPaymentChannelClose(Bob.eth, "1.0", sig, Alice.eth.address, (obj) => {
    console.log(obj)
}, (error) => {
    console.log(error)
})*/