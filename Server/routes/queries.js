var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");

//Get models
var Query = require('../models/query');
var Census = require('../models/census');
var User = require('../models/user');

// get all queries
router.get('/', function(req,res){
    Query.find({}, function(err, queries){
        if(err) console.log(err);
        res.json(queries);
    });
})

// get query by id
router.get('/:id', function(req, res) {
    var id = req.params.id;
    Query.findOne({_id: id}, function(err, query){
        if(err) console.log(err);
       // console.log("query:" + query);
        res.json(query);
    });
})

router.put('/:id', function (req, res) {

    var id = req.params.id;
    
    var file = (req.body.file === null) ? "" : req.body.file;

   // console.log("title:" + req.body.title);
   // console.log("order:" + req.body.order);
   // console.log("location:" + req.body.olocationrder);
    
    var proposal = {
        order : req.body.order,
        title : req.body.title, 
        file : file,        
        description: req.body.description,
        location : req.body.location,
        cost : req.body.cost,
        checked : req.body.checked,
        votes : 0, 
        submissions : []
    };
    
    
    Query.update({_id: id},{'$addToSet' : { 'proposals': proposal}}

   ).exec(function( err, data ){
        if (data) {
             res.json("ok");
            
            
        } else {
            res.json("there was an error");
        }
    });

});
//get proposal by id of a certain query
router.get('/:id/:proposalId', function(req, res) {
    var id = req.params.id;
    var proposalId = req.params.proposalId;
    Query.findOne({_id: id}).select({ proposals: {$elemMatch: {_id: proposalId}}}).exec(function (err, doc) {
        if(err) console.log(err);        
        res.json(doc.proposals[0]);
    });
})


// add new proposal to query
router.put('/:id', function (req, res) {

    var id = req.params.id;
    
    var proposal = {
        order : req.body.order,
        title : req.body.title, 
        images : req.body.images,        
        description: req.body.description,
        executiveState: {state: '', show: false},
        location : req.body.location,
        cost : req.body.cost,
        checked : false,
        votes : 0,             
	    winner: false,	    
        submissions : []
    };
    
    
    Query.update({_id: id}, {'$addToSet' : { 'proposals': proposal}}

   ).exec(function( err, data ){
        if (data) {
             res.json("ok");
            
            
        } else {
            res.json("there was an error");
        }
    });

});

// update proposal
router.put('/update-proposal/:id/:proposalId', function (req, res) {

    var id = req.params.id;
    var proposalId = req.params.proposalId;
    var executiveState = {
        state : req.body.executiveState,
        show: req.body.showState
    };

    console.log("id: ", id);
    console.log("executiveState: ", executiveState);
    Query.update(
        {
          _id: id,
          proposals: { '$elemMatch': { _id: proposalId} }
        },
        {
          $set: { 'proposals.$.title' : req.body.title, 'proposals.$.description' : req.body.description, 'proposals.$.executiveState': executiveState, 'proposals.$.location' : req.body.location, 
           'proposals.$.cost' : req.body.cost,  'proposals.$.images' : req.body.images }
        }).exec(function (err, doc) {
            if(err) console.log(err);
            console.log("doc: ",doc);
            res.json("ok");
      });
});


function getAge(dateString, endDate) {
    var parts = dateString.split('/');
    var birthDate = new Date(parts[2],parts[0]-1,parts[1]);       
         
    var age = endDate.getFullYear() - birthDate.getFullYear();        
    var m = endDate.getMonth() - birthDate.getMonth();       
    if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getWeekDay(){
    var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
    return n;
};

function generateSecretWord(){
    var secret = "Todayis" + getWeekDay() + ".Yeah!";
    return secret;
}; 

function generateSecretWordForDNI(){
    var secret = "Todayis Yeah!";
    return secret;
};

//find if a person with a current dni can vote and has not participated in a current inquiry
router.post('/validation', function(req, res) {
    var inquiryId = req.body.id;
   
    //var DNI = CryptoJS.AES.decrypt(req.body.dni, generateSecretWord()).toString(CryptoJS.enc.Utf8); 
    var document = req.body.document;
    var birthdate = req.body.birthdate.toString();
    //console.log("decrypted DNI: " + DNI);
    //console.log("birhdate " + birthdate);

    Query.find({_id: inquiryId, $or: [ {submissions: {$elemMatch: {document : document}}}, {submissions: {$elemMatch: {passport : document}}} ] }/* submissions: {$elemMatch: {dni : DNI}}}*/, function(err, inquiry) {
      
      if (err) res.send(err);
             
      
        Census.find({ $or: [ { document: document }, { passport: document } ] }, function(err, doc) {
            if (err) res.send(err); 
            if(inquiry.length > 0 && doc.length > 0 && doc[0].birthdate === birthdate){             
                res.json("2"); // has already participated           
            } else if(doc.length > 0) {
               // console.log("doc " + doc);
               // console.log("birhdate doc " + doc[0].birthdate);
                if (doc[0].birthdate === birthdate) {
                    res.json("0"); // can vote
                   }
                   else {
                    res.json("1"); //birthdate is not correct
                   }
                
            } else {    
                res.json("3"); //is not in the census                
               /* Query.find({_id: inquiryId, submissions: {$elemMatch: {passport : DNI}}}, function(err, inquiry) {
      
                    if (err) res.send(err);
                           
                    
                      Census.find({passport: DNI}, function(err, doc) {
                          if (err) res.send(err); 
                          if(inquiry.length > 0 && doc.length > 0 && doc[0].birthdate === birthdate){             
                              res.json("2"); // has already participated           
                          } else if(doc.length > 0) {
                             // console.log("doc " + doc);
                             // console.log("birhdate doc " + doc[0].birthdate);
                              if (doc[0].birthdate === birthdate) {
                                  res.json("0"); // can vote
                                 }
                                 else {
                                  res.json("1"); //birthdate is not correct
                                 }
                              
                          } else {                    
                              res.json("3"); //is not in the census
                          }
                      });          
                  
                      
                  });*/ 
            }
        });           
    
        
    });

});

router.get('query/census/census_count', function(req, res){
    Census.count(function(err, count) {
        if (err) { res.send(err)}
            //console.log("census count:" + count);
        res.json(count); 
    });
});

// update poll
router.put('/query/vote', function(req, res) {
  /*  var gender = req.body.gender;
    var street = req.body.street;*/
    var id = req.body.pollId;
    var document = req.body.document;
    var submissionDate = req.body.submissionDate;
   // var decryptedDNI = CryptoJS.AES.decrypt(req.body.dni, generateSecretWord()).toString(CryptoJS.enc.Utf8); 

    
    var submission_element = {document : document, passport: ""/*, street:street*/};
    //console.log("submission:" + submission_element);
    var submissions = req.body.submissions;
    Census.find({ $or: [ { document: document }, { passport: document } ] }, function(err, citizen) {
        if(err) console.log(err); 
        if(citizen.length > 0) {
            submission_element.document = citizen[0].document;
            submission_element.birthdate = citizen[0].birthdate;
            submission_element.postalCode = citizen[0].postalCode;
            submission_element.gender = citizen[0].gender;  
            submission_element.submissionDate = submissionDate;          
            Query.update({_id: id}, {'$addToSet' : {'submissions': submission_element/*, 'street': street*/}}).exec(function( err, data ){
                if(err) console.log(err);
               
                if(data) {
                    Query.findOne({ _id: id }, function (err, doc){ 
                       if(err) console.log(err);
                            submissions.forEach(function(submission){
                                var bId = submission;
                                   // console.log("bId:" + bId);
                                                           
                                    doc.proposals.id(bId).votes += 1;
                                    doc.proposals.id(bId).submissions.push(submission_element);
                              });
                               
                                doc.totalVotes += 1;
                           //     io.sockets.emit('votes', {number: doc.totalVotes, id: id});
                                doc.save();
                                 res.json('Updated!');
                     //   }
                        
                     //  })
                      
                    }); 
                   
                } else {
                    res.json('Did not update!');
                }
            });
        }
    });    
    //console.log("submissions:" +  req.body.submissions);
    
});

 //clear votes
 router.put('/query/clear_votes/:id', function(req, res) {
    var pollId = req.params.id;
    Query.findById(pollId, function(err, poll) {
        if(err)
        res.send(err)
        poll.totalVotes = 0;
        poll.submissions = [];
        poll.proposals.forEach(function(proposal){
            proposal.votes = 0;
            proposal.submissions = [];
        });
        poll.save(function(err) {
            if (err)
                res.send(err);
            res.json(poll);
        });
    })
});

//check or uncheck winner proposal
router.put('/query/check_winner/:pollId', function(req, res) {
    var pollId = req.params.pollId;    
    var id = req.body.id;
   // var winner = req.body.winner;
    Query.findById(pollId, function(err, poll) {
        if(err)
        res.send(err)
        
        poll.proposals.forEach(function(proposal){          
           if(proposal._id == id) {
                proposal.winner = !proposal.winner;              
            }          
        });
        poll.save(function(err) {
            if (err)
                res.send(err);
            res.json(poll);
        });
    })
});

//change phase
router.put('/query/change_phase', function(req, res) {
    var pollId = req.body.id;
    var state = req.body.state;
    var phase;
    Query.findById(pollId, function(err, poll) {
        if(err)
        res.send(err)
        for (let i = 0; i < poll.phases.length; i++) {
            //console.log(query.phases[i]);
            if(poll.phases[i].number === state){
              phase = poll.phases[i];
            }
        }

        poll.phase = phase;
        
        poll.save(function(err) {
            if (err)
                res.send(err);
            res.json(poll);
        });
    })
});

// update phase
router.put('/update-phase/:id/:phaseNumber', function (req, res) {

    var id = req.params.id;
    var phaseNumber = req.params.phaseNumber;
    var number = req.body.number;
   
  //  console.log("phaseId: ", phaseId);
    Query.findOneAndUpdate(
        {
          _id: id,
          phases: { '$elemMatch': { number: phaseNumber} }
        },
        {
          $set: { 'phases.$.number' : req.body.number, 'phases.$.description' : req.body.description, 'phases.$.message' : req.body.message, 
          'phases.$.process' : req.body.process}
        }).exec(function (err, doc) {
            if(err) console.log(err);
        //    console.log("doc: ",doc);
            if(doc.phase.number === number) {
                var phase = {                   
                    number: req.body.number,                   
                    message: req.body.message,
                    process : req.body.process,
                    description: req.body.description                    
                };
                doc.phase = phase;
                doc.save();
            }
            res.json("ok");
      });
});

// delete proposal 
router.get('/remove-proposal/:id/:proposalId', function(req, res) {
    var id = req.params.id;
    var proposalId = req.params.proposalId;   
    console.log("proposalId", proposalId);
    Query.update({_id: id}, { $pull: { proposals: { _id: proposalId } } }).exec(function( err, data ){
        if(err)
        res.send(err)
        if(data.ok === 1) {
            Query.findById(id, function(err, query) {
                if(err)
                res.send(err)
                res.json(query);
            })
        }
    })

    

});

//save phase text
router.put('/query/save_text', function(req, res) {
    var pollId = req.body.id;
    var phaseNumber = req.body.phase_number;
    var text = req.body.text;
    Query.findById(pollId, function(err, poll) {
        if(err)
        res.send(err)
        poll.phases.forEach(function(phase){
            if(phase.number === phaseNumber){
                phase.text = text;
            }
        })
              
        poll.save(function(err) {
            if (err)
                res.send(err);
            res.json(poll);
        });
    })
});

//Exports
module.exports = router;