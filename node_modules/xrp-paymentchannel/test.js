const paymentchannel = require("./index")
const rippleKeyPairs = require("ripple-keypairs");

const listener = require("./listener")

const seeds = {
    alice: "sn4MszCCYYjFn5Vdvk851LppW9fdK",
    bob: "ssxp4ECtaVfX9xYU6DuSkv2vGYoxE"
}

const alice = paymentchannel.createWallet(seeds.alice)
const bob = paymentchannel.createWallet(seeds.bob)
console.log(alice)
//listener.startSocket(bob.address)
const channel = {
    account: 'rL9MHv3hz3eZxL7xrigpYSBSoGPFZcKLuj',
    amount: '3000000',
    balance: '0',
    channel_id: '4D8A76DA0CF23BD9F9481DE58A3F8BF1804649C8FFA5B3EB13BD590A79865341',
    destination_account: 'rnKJUnrUM62Sx3A3TQDnyKwGVQR6Ctw8vD',
    public_key: 'aBQR1iJTgKZPuJdd8k5EfJ4nBRASPYAkaG3NMK5umPXW3RiM7MAP',
    public_key_hex: '03458DE9541A122F9AB70B98D206923207A314A7823B0C123DCD22E998740AFEB8',
    settle_delay: 60
  }
/*paymentchannel.open(alice, bob.address, "1000000", 60, "5000", (obj) => {
    //console.log(obj)
}, (error) => {
    //console.log(error)
})*/

/*paymentchannel.getXRPChannels(alice.address,bob.address,(obj) => {
    console.log(obj.result.channels)
},(error) => {
    console.log(error)
})*/

/*paymentchannel.fund(alice,channel.channel_id,"1000000","5000",(obj) => {
    console.log(obj)
},(error) => {
    console.log(error)
})*/


/*const amount = "0.0002"
const drops = parseInt(parseFloat(amount) * 1000000).toString()
const signedClaim = paymentchannel.sign(alice,amount,channel.channel_id)
const claim = paymentchannel.claim(channel.channel_id, drops)
const isVerified = paymentchannel.verifyClaim(claim,signedClaim,alice.publicKey)

console.log("is verified "+ isVerified)
console.log(signedClaim)
console.log(drops)

paymentchannel.makeClaim(bob,channel,alice.publicKey,drops, drops,signedClaim,"5000",(obj) => {
    //console.log(obj)
},(error) => {
    console.log(error)
})*/
