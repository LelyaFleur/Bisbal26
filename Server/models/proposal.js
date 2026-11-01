var mongoose = require('mongoose');
//var voteSchema = new mongoose.Schema({ ip: 'String' });

var submissionSchema = new mongoose.Schema({
	_id:false,
    document: String,
    gender: String,
    birthdate: String,
    postalCode:String
    
});

var authorSchema = new mongoose.Schema({
    name : String,
    surname: String,
	email: String,
    phone: String,
    dni: String
})

var proposalSchema = new mongoose.Schema({
	author: authorSchema,
 	short_title: String, 	
    title: String,
    file : String,
    object: String,
    description: String,
    location: String,
    cost: String,
    how: String,
    howEntity: String,
    checked: Boolean,
    votes: Number, 
    submissions: [submissionSchema]

});


// return the model

module.exports = mongoose.model('proposals', proposalSchema);
