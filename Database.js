var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
var exports = module.exports = {};
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("connected")
})
exports.mongoose = mongoose
