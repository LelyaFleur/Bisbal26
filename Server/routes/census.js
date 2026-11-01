var express = require('express');
var router = express.Router();

//Get models

var Census = require('../models/census');

router.get('/', function(req, res){
    Census.count(function(err, count) {
        if (err) { res.send(err)}           
        res.json(count); 
    });
});


//Exports
module.exports = router;