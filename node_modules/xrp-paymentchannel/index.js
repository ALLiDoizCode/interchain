const xrp = require("./XRP/xrp")
const rippleKeyPairs = require("ripple-keypairs");
var exports = module.exports = {};

exports.createWallet = (secret) => {
  var keypair = rippleKeyPairs.deriveKeypair(secret)
  return{
      secret:secret,
      publicKey:keypair.publicKey,
      privateKey:keypair.publicKey,
      address:rippleKeyPairs.deriveAddress(keypair.publicKey)
  }
}

exports.open = (owner, recipient, value, delay, fee, callback, error) => {
  const tx = xrp.accountInfo(owner.address)
  xrp.submit(tx, (obj) => {
    var seq = obj.result.account_data.Sequence;
    //SettleDelay
    xrp.createChannel(owner.address, value, recipient, delay, owner.publicKey, seq, fee, owner.secret, (obj) => {
      const engine_result = obj.result.engine_result
      const engine_result_message = obj.result.engine_result_message
      if (obj.result.engine_result == "tesSUCCESS") {
        callback(obj)
      } else {
        error(obj.result.engine_result)
      }
      console.log("Ledger message " + engine_result_message + " " + engine_result)
    }, (err) => {
      error(err)
    })
  }, (err) => {
    error(err)
  })
}

exports.fund = (owner, channel, value, fee, callback, error) => {
  const tx = xrp.accountInfo(owner.address)
  xrp.submit(tx, (obj) => {
    var seq = obj.result.account_data.Sequence;
    xrp.fundChannel(owner.address, channel, value, fee, seq, owner.secret, (obj) => {
      const engine_result = obj.result.engine_result
      const engine_result_message = obj.result.engine_result_message
      if (obj.result.engine_result == "tesSUCCESS") {
        console.log("success")
        callback(obj)
      } else {
        console.log("fail")
        error(obj.result.engine_result)
      }
      console.log("Ledger message " + engine_result_message + " " + engine_result)
    }, (err) => {
      error(err)
    })
  }, (err) => {
    error(err)
  })
}

exports.makeClaim = (owner, channel, senderPublicKey, value, balance ,signature, fee, callback, error) => {
  const tx = xrp.accountInfo(owner.address)
  xrp.submit(tx, (obj) => {
    console.log(obj)
    var seq = obj.result.account_data.Sequence;
    xrp.submitClaim(owner.address, value, balance, channel.channel_id, senderPublicKey, signature, fee, seq, owner.secret, (obj) => {
      const engine_result = obj.result.engine_result
      const engine_result_message = obj.result.engine_result_message
      if (obj.result.engine_result == "tesSUCCESS") {
        //console.log("success")
        callback(obj)
      } else {
        console.log("fail")
        error(obj.result.engine_result)
      }
      console.log("Ledger message " + engine_result_message + " " + engine_result)
    }, error)
  }, (error) => {
    console.log(error)
  })
}

exports.closeChannel = (owner, channel, fee, callback, error) => {
  const tx = xrp.accountInfo(owner.address)
  xrp.submit(tx, (obj) => {
    var seq = obj.result.account_data.Sequence;
    xrp.closeChannel(owner.address, channel, fee, seq, owner.secret, (obj) => {
      const engine_result = obj.result.engine_result
      const engine_result_message = obj.result.engine_result_message
      if (obj.result.engine_result == "tesSUCCESS") {
        console.log("success")
        callback(obj)
      } else {
        console.log("fail")
        error(obj.result.engine_result)
      }
      console.log("Ledger message " + engine_result_message + " " + engine_result)
    }, error)
  }, error)
}

exports.sign = (wallet, value, channel) => {
  var claim;
  var signature;
  var verified;

  let amount = (parseFloat(value) * 1000000)
  claim = xrp.claim(channel, parseInt(amount).toString())
  signature = xrp.signClaim(claim, wallet.secret)
  verified = xrp.verifyClaim(claim, signature, xrp.keypair(wallet.secret).publicKey)
  if (verified) {
    console.log("claim was verified")
    return signature
  }
}

exports.getXRPChannels = (address, recipient, callback, error) => {
  const channelTX = xrp.accountChannel(address, recipient)
  xrp.submit(channelTX, callback, error)
}

exports.claim = xrp.claim
exports.keypair = xrp.keypair
exports.verifyClaim = xrp.verifyClaim
exports.getAddress = xrp.getAddress