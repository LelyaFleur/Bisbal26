var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// Get Page Model
var Proposal = require('../models/proposal');

/*
* GET all proposals
*/
router.get('/', function (req, res) {
    Proposal.find({}, function (err, proposals) {
        if (err) console.log(err);
        res.json(proposals);
    });
});

router.get('/selected', function (req, res) {
    Proposal.find({checked : true}, function (err, proposals) {
        if (err) console.log(err);
        res.json(proposals);
    });
});

/*
* GET a proposal
*/
router.get('/:id', function (req, res) {

    var id = req.params.id;
    //console.log("index:" + id);

    Proposal.findOne({ _id: id }, function (err, proposal) {
        if (err) console.log(err);
        //console.log(proposal);
        res.json(proposal);
    });
});

/*
* POST add proposal
*/
router.post('/add-proposal', function (req, res) {

    var author = {
        name : req.body.name,
       // surname : req.body.surname,
        dni : req.body.dni,
        email: req.body.email,
        phone: req.body.phone
    };
     
    var title = req.body.title; 
    var file = req.body.file;
    var object = req.body.object;
    var description  = req.body.description;
    var location = req.body.location;
    var how = req.body.how;
    var howEntity = req.body.howEntity;
    var cost = req.body.cost;
    var checked = false;
    var votes = 0; 
    var submissions = [];
    //console.log("author:" + author.name);
    //console.log("how Entity:" + req.body.howEntity);

    Proposal.findOne({ title: title }, function (err, proposal) {
        if (err) console.log(err);

            var proposal = new Proposal({
                author: author,                  
                title: title,
                file: file,
                object: object,
                description: description,
                location: location,
                cost: cost,
                checked: checked,
                how: req.body.how,
                howEntity: req.body.howEntity,
                votes: votes, 
                submissions: submissions
            });

            proposal.save(function (err) {
                if (err) console.log(err);
                res.json("ok");
            });
    });
});

router.put('/update-proposal', function (req, res) {

    var id = req.body.id;
    var author = {
        name : req.body.name,
    //    surname : req.body.surname,
        dni : req.body.dni,
        email: req.body.email,
        phone: req.body.phone
    };

    var file = (req.body.file === null) ? "" : req.body.file;

    //console.log("title:" + req.body.title);
    
    var updated_proposal = {
        author : author,       
        title : req.body.title, 
        file : file,
        object : req.body.object,
        description: req.body.description,
        location : req.body.location,
        cost : req.body.cost,
        checked : req.body.checked,
        how: req.body.how,
        howEntity: req.body.howEntity,
        votes : 0, 
        submissions : []
    };
    
    //console.log("author:" + author.name);
    Proposal.update({_id: id},{ $set:
      {
        author : author,        
        title : req.body.title, 
        file : file,
        object : req.body.object,
        description: req.body.description,   
        location : req.body.location,     
        cost : req.body.cost,
        checked : req.body.checked,
        how: req.body.how,
        howEntity: req.body.howEntity,
        votes : 0, 
        submissions : []
      }

   }).exec(function( err, data ){
        if (data) {
             res.json("ok");
            
            
        } else {
            res.json("there is no such proposal");
        }
    });

});

router.put('/select-proposal', function (req, res) {
    var id = req.body.id;
    Proposal.update({_id: id},{ $set:
      {        
        checked : req.body.checked        
      }

   }).exec(function( err, data ){
        if (data) {
             res.json("ok");
            
            
        } else {
            res.json("there is no such proposal");
        }
    });

});

router.get('/file/:id', function (req, res) {
    var id = req.params.id;

    Proposal.findOne({ _id: id }, function (err, proposal) {
        if (err) console.log(err);
       // var filePath = "./dist/assets/images/"; // Or format the path using the `id` rest param
      //  var fileName = proposal.file; // The default name the browser will use
        let filename = proposal.file;
        let absPath = path.join(__dirname, '/dist/assets/', filename);
        let relPath = path.join('./dist/assets/', filename); // path relative to server root

       // res.download(filePath, fileName); 
        res.download(relPath, (err) => {
            if (err) {
                console.log(err);
            }
            fs.unlink(relPath, (err) => {
                if (err) {
                console.log(err);
                }
               // console.log('FILE [' + filename + '] REMOVED!');
            });
            });
    });
});




router.delete('/delete-all', function (req, res) {

    Proposal.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
            res.json("error");
        } else {
            res.json("ok");
        }
    });
});

/*
* GET edit page

router.get('/edit-page/:id', function (req, res) {

    var id = req.params.id;

    Page.findById(id, function (err, page) {
        if (err) console.log(err);
        res.json(page);
    });
});*/

/*
* POST edit page

router.post('/edit-page/:id', function (req, res) {

    var id = req.params.id;

    var title = req.body.title;
    var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;
    var hasSidebar = req.body.hasSidebar;
    var sidebar = (hasSidebar) ? "yes" : "no";

    Page.findOne({ slug: slug, _id: { '$ne': id } }, function (e, p) {
        if (e) console.log(e);
        if (p) {
            res.json("pageExists");
        } else {
            Page.findById(id, function (err, page) {
                if (err) console.log(err);

                page.title = title;
                page.slug = slug;
                page.content = content;
                page.sidebar = sidebar;

                page.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.json("problem");
                    } else {
                        res.json("ok");
                    }
                });
            });
        }
    });
});*/

/*
* GET delete page
router.get('/delete-page/:id', function (req, res) {

    var id = req.params.id;

    Page.findByIdAndRemove(id, function (err) {
        if (err) {
            console.log(err);
            res.json("error");
        } else {
            res.json("ok");
        }
    });
});*/


// Exports
module.exports = router;