const axios = require('axios');
const db = require('../Database')
var exports = module.exports = {};
var currencySchema = new db.mongoose.Schema({
    mid: String,
    bid: String,
    ask: String,
    last_price: String,
    low: String,
    high: String,
    volume: String,
    timestamp: String,
    currency: String
});
var currency = db.mongoose.model('currency', currencySchema);

exports.saveXRPUSD = (callback) => {
    axios.get('https://api.bitfinex.com/v1/pubticker/xrpusd').then((obj) => {
        var data = obj.data
        data.currency = "xrp"
        var newRate = new currency(data);

        newRate.save((err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)
}
exports.updateXRPUSD = (callback) => {
    axios.get('https://api.bitfinex.com/v1/pubticker/xrpusd').then((obj) => {
        var query = { currency: "xrp" };
        currency.update(query, obj.data, {}, (err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)
}

exports.saveETHUSD = (callback) => {
    axios.get('https://api.bitfinex.com/v1/pubticker/ethusd').then((obj) => {
        var data = obj.data
        data.currency = "eth"
        var newRate = new currency(data);
        newRate.save((err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)

}

exports.updateETHUSD = (callback) => {
    axios.get('https://api.bitfinex.com/v1/pubticker/ethusd').then((obj) => {
        var query = { currency: "eth" };
        currency.update(query, obj.data, {}, (err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)
}

exports.saveEOSUSD = (callback) => {
    axios.get('https://api.bitfinex.com/v1/pubticker/eosusd').then((obj) => {
        var data = obj.data
        data.currency = "eos"
        var newRate = new currency(data);
        newRate.save((err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)
}
exports.updateEOSUSD = (callback) => {
    axios.get('https://api.bitfinex.com/v1/pubticker/eosusd').then((obj) => {
        var query = { currency: "eos" };
        currency.update(query, obj.data, {}, (err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)

}

exports.saveBTCUSD = (callback) => {

    axios.get('https://api.bitfinex.com/v1/pubticker/btcusd').then((obj) => {
        var data = obj.data
        data.currency = "btc"
        var newRate = new currency(data);
        newRate.save((err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)

}

exports.updateBTCUSD = (callback) => {

    axios.get('https://api.bitfinex.com/v1/pubticker/btcusd').then((obj) => {
        var query = { currency: "btc" };
        currency.update(query, obj.data, {}, (err, obj) => {
            if (err) return console.error(err);
            callback(obj)
        });
    }).catch(console.log)

}

exports.find = (callback) => {
    currency.find((err, obj) => {
        if (err) return console.error(err);
        callback(obj)
    })
}

