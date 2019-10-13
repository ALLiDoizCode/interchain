const db = require('../Database')
var exports = module.exports = {};

var accountSchema = new db.mongoose.Schema({
    channel:String,
    address:String,
    hash:String,
    ledger:String
});

var Account = db.mongoose.model('Account', accountSchema);

const saveAccount = (obj, callback) => {

    var newAccount = new Account(obj);

    newAccount.save(callback);
}

const updateAccount = (obj, callback) => {
    var query = { channel: obj.channel };
    Account.update(query, obj, {}, callback);
}


const findAccount = (id,callback) => {
    Account.findById(id, callback)
}

const find = (callback) => {
    Account.find(callback)
}

exports.updateAccount = updateAccount
exports.saveAccount = saveAccount
exports.findAccount = findAccount
exports.find = find


var destinationSchema = new db.mongoose.Schema({
    channel:String,
    address:String,
    hash:String,
    ledger:String
});

var Destination = db.mongoose.model('destination', destinationSchema);

const saveDestination = (obj, callback) => {

    var newDestination = new Destination(obj);

    newDestination.save(callback);
}

const findDestination = (address,callback) => {
    Destination.find({address:address}, callback)
}

exports.saveDestination = saveDestination
exports.findDestination = findDestination