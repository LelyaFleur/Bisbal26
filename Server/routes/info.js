var express = require('express');
var router = express.Router();

// Get Page Model
var QueryInfo = require('../models/info');

/*
* GET all infos
*/
router.get('/', function (req, res) {
    QueryInfo.find({}, function (err, queryInfo) {
        if (err) console.log(err);
        res.json(queryInfo);
    });
});

/*
* GET info by queryId
*/
router.get('/:queryId', function (req, res) {
    var id = req.params.queryId;
   // console.log("queryId:", id);
    QueryInfo.find({queryId: id}, function (err, queryInfo) {
        if (err) console.log(err);     
        res.json(queryInfo[0]);
    });
});

/*
* add queryInfo
*/
router.post('/add-info', function (req, res) {

    var micrositeId = req.body.micrositeId;
    var queryId = req.body.queryId;   
    var title = req.body.title;
    var instructions = req.body.instructions;
    var faqs = req.body.faqs;
    var maxSelection = req.body.maxSelection;
    var message1 = req.body.message1;
    var message2 = req.body.message2; 
    var message3 = req.body.message3; 
    var message4 = req.body.message4; 


    var queryInfo = new QueryInfo({
        micrositeId: micrositeId,
        queryId: queryId,  
        title: title,                
        instructions: instructions,
        faqs: faqs,
        maxSelection: maxSelection,
        message1: message1,
        message2: message2,
        message3: message3,
        message4: message4       
    });

    queryInfo.save(function (err) {
        if (err) console.log(err);
        res.json("ok");
    });
});


/*
* edit queryInfo
*/
router.post('/edit-query-info/:id', function (req, res) {
    var id = req.params.id;
    var micrositeId = req.body.micrositeId;
    var queryId = req.body.queryId;   
    var title = req.body.title;
    var instructions = req.body.instructions;
    var faqs = req.body.faqs;
    var maxSelection = req.body.maxSelection;
    var message1 = req.body.message1;
    var message2 = req.body.message2; 
    var message3 = req.body.message3; 
    var message4 = req.body.message4; 

    QueryInfo.updateOne(
        {
          _id: id
        },
        {
          $set: {'title': title, 'instructions': instructions, 'faqs' : faqs, 'maxSelection': maxSelection, 'message1': message1,  'message2': message2, 'message3': message3, 'message4': message4 }
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

/*
* delete queryInfo
*/
router.get('/delete-query-info/:id', function (req, res) {

    var id = req.params.id;
    console.log("page id", id)
    Page.findByIdAndRemove(id, function (err) {
        if (err) {
            //console.log(err);
            res.json("error");
        } else {
            res.json("ok");
        }
    });
});

// Exports
module.exports = router;