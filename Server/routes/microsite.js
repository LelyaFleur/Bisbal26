var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");

//Get models
var Microsite = require('../models/microsite');
var Census = require('../models/census');
var User = require('../models/user');

// get all microsites
router.get('/', function(req,res){
    Microsite.find({}, function(err, microsites){
        if(err) console.log(err);
        res.json(microsites);
    });
})

// get microsite by id
router.get('/:id', function(req, res) {
    var id = req.params.id;
    Microsite.findOne({_id: id}, function(err, microsite){
        if(err) console.log(err);
       // console.log("query:" + query);
        res.json(microsite);
    });
})


//add phase
router.post('add_phase/:id', function (req, res) {

    var id = req.params.id;
    
    var phase = {
        number: req.body.number,
        title : req.body.title,
        message: req.body.message,
        date : req.body.date,
        description: req.body.description        
    };
    
    Microsite.update({_id: id},{'$addToSet' : { 'phases': phase}}).exec(function( err, data ){
        if (data) {
             res.json("ok");
            
            
        } else {
            res.json("there was an error");
        }
    });

});

// update who we are
router.put('/update-who-we-are/:id', function (req, res) {
    var id = req.params.id;
    var whoweare = req.body.whoweare;
    console.log("who we are:", whoweare)
    Microsite.updateOne({_id:id},        
        {
          $set: {'whois': whoweare }
        }).exec(function (err, doc) {
            if(err) console.log(err);
            res.json("ok");
      });

});

// update phase
router.put('/update-phase/:id/:phaseNumber', function (req, res) {

    var id = req.params.id;
    var phaseNumber = req.params.phaseNumber;
    var number = req.body.number;

    console.log("id: ", id);
  //  console.log("phaseId: ", phaseId);
    Microsite.findOneAndUpdate(
        {
          _id: id,
          phases: { '$elemMatch': { number: phaseNumber} }
        },
        {
          $set: { 'phases.$.name' : req.body.name, 'phases.$.number' : req.body.number, 'phases.$.title' : req.body.title, 'phases.$.message' : req.body.message, 
          'phases.$.date' : req.body.date, 'phases.$.description' : req.body.description}
        }).exec(function (err, doc) {
            if(err) console.log(err);
        //    console.log("doc: ",doc);
            if(doc.activePhase.number === number) {
                var phase = {
                    name: req.body.name,
                    number: req.body.number,
                    title : req.body.title,
                    message: req.body.message,
                    date : req.body.date,
                    description: req.body.description                    
                };
                doc.activePhase = phase;
                doc.save();
            }
            res.json("ok");
      });
});

// change active phase
router.put('/activate-phase/:id', function (req, res) {

    var id = req.params.id;

    Microsite.update(
        {
          _id: id
        },
        {
          $set: { 'activePhase' : req.body }
        }).exec(function (err, doc) {
            if(err) console.log(err);
            console.log("doc: ",doc);
            if(doc.ok === 1) {
                res.json("ok");
            }   else {
                res.json("not ok");
            }         
            
      });
});

// update phases
router.put('/update-phases/:id', function (req, res) {

    var id = req.params.id;    

    console.log("id: ", id);
   // console.log("phaseId: ", phaseId);
    Microsite.findOneAndUpdate(
        {
          _id: id
        },
        {
          $set: { 'phases' : req.body.phases }
        }).exec(function (err, doc) {
            if(err) console.log(err);
          //  console.log("doc: ",doc); 
            req.body.phases.forEach(function(phase){
                if(doc.activePhase.number === phase.number) {                    
                    doc.activePhase = phase;
                }    
            })

            doc.save(function(err) {
                if (err)
                    res.send(err);
                    res.json("ok");
            });
                  
           
      });
});

// update historial
router.put('/update-historial/:id', function (req, res) {

    var id = req.params.id;    

    console.log("id: ", id);
 //   console.log("phaseId: ", phaseId);
    Microsite.update(
        {
          _id: id
        },
        {
          $set: { 'historial' : req.body.historial }
        }).exec(function (err, doc) {
            if(err) console.log(err);
         //   console.log("doc: ",doc);           
            res.json("ok");
      });
});


//Exports
module.exports = router;