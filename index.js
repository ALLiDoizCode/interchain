var express = require("express");
var bodyParser = require("body-parser");
var accountRoutes = require('./Routes/AccountRoutes')
var currency = require('./Services/CurrencyService')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/saveAccount",accountRoutes.newAccount);

app.get('/info', function (req, res) {
    res.json(
        {
            "fee": 0.0001,
            "liquidy1": 1000000,
            "liquidy2": 1000000,
            "xrpAddress": 1000000,
            "ethAddress": 1000000
        })
});

app.listen(3000, function () {
    console.log("Started on PORT 3000");
})
