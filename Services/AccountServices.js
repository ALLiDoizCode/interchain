const db = require('../Database')

var accountSchema = new db.mongoose.Schema({
    xrpAddress:String,
    ethAddress:String,
    xrpChannel:String,
    ethChannel:String,
    xrpClaim:String,
    ethClaim:String
});

var Account = db.mongoose.model('Account', accountSchema);

const saveAccount= (obj, callback) => {

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