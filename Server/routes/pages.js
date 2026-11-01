var express = require('express');
var router = express.Router();

// Get Page Model
var Page = require('../models/page');

/*
* GET all pages
*/
router.get('/', function (req, res) {
    Page.find({}, function (err, pages) {
        if (err) console.log(err);
        res.json(pages);
    });
});

/*
* GET pages by phase
*/
router.get('/by_phase/:phase', function (req, res) {
    var phase = req.params.phase;
    Page.find({phase : phase}, function (err, pages) {
        if (err) console.log(err);
        res.json(pages);
    });
});

/*
* GET a page
*/
router.get('/:micrositeId/:index/:phase', function (req, res) {
    var micrositeId = req.params.micrositeId;
    var id = req.params.index;
    var phase = req.params.phase;
    //console.log("index:" + id);

    Page.findOne({ micrositeId: micrositeId, index: id, phase : phase }, function (err, page) {
        if (err) console.log(err);
        //console.log(page);
        res.json(page);
    });
});

/*
* GET a page by Id
*/

router.get('/:id', function (req, res) {

    
    var id = req.params.id;
   // console.log("index:" + id);

    Page.findOne({_id : id}, function (err, page) {
        if (err) console.log(err);
       // console.log(page);
        res.json(page);
    });
});

/*
* POST add page
*/
router.post('/add-page', function (req, res) {

    var micrositeId = req.body.micrositeId;
    var index = req.body.index;
    var coverTitle = req.body.coverTitle;    
    var title = req.body.title;
    var phase = req.body.phase;
    var image = req.body.image;
    var content = req.body.content;
    var type = req.body.type; 
    var note = req.body.note;

    var page = new Page({
        micrositeId: micrositeId,
        index: index,  
        coverTitle: coverTitle,                
        title: title,
        phase: phase,
        image: image,
        content: content,
        type: type,
        note: note        
    });

    page.save(function (err) {
        if (err) console.log(err);
        res.json("ok");
    });
});


/*
* POST edit page
*/
router.post('/edit-page/:id', function (req, res) {
    var id = req.params.id;
    var index = req.body.index;
    var coverTitle = req.body.coverTitle;    
    var title = req.body.title;
    var phase = req.body.phase;
    var image = req.body.image;
    var content = req.body.content;
    var type = req.body.type; 
    var note = req.body.note;

    Page.updateOne(
        {
          _id: id
        },
        {
          $set: {'index': index, 'coverTitle': coverTitle, 'title' : title, 'phase': phase, 'image': image,  'content': content, 'type': type, 'note': note }
        }).exec(function (err, doc) {
            if(err) console.log(err);
            console.log("doc: ",doc);           
            res.json("ok");
      });
});

/*
* GET delete page
*/
router.get('/delete-page/:id', function (req, res) {

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