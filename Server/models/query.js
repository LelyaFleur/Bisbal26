var mongoose = require('mongoose');
//var voteSchema = new mongoose.Schema({ ip: 'String' });

var submissionSchema = new mongoose.Schema({
	_id:false,
	passport: String,
	document: String,
    gender: String,
    birthdate: String,
    postalCode:String,
	submissionDate:Date	
	
});

var imageSchema = new mongoose.Schema({
	_id:false,
	name : String,
	image_footer: String
});


var proposalSchema = new mongoose.Schema({
	order: Number,	
 	images: [imageSchema],
    title: String,
    object: String,
    description: String,
	location: String,	
    cost: {quantity: String, note: String},
	checked: Boolean,
	winner: Boolean,
	votes: Number,	
	executiveState: {state: String, show: Boolean},
    submissions: [submissionSchema]

});

var phaseSchema = new mongoose.Schema({
	_id: false,
	number: Number,
	description: String,
	message: String,
	process : String,
	activity: { startDate: Date, endDate: Date }
	
})

var QuerySchema = new mongoose.Schema({
	
	title: String,
	description: String,
	maxSelection: Number,
	phases : [phaseSchema],
	proposals: [proposalSchema],
	submissions: [submissionSchema],
	publishDate: { startDate: Date, endDate: Date },
	phase: phaseSchema,
	totalVotes: Number
},{ usePushEach: true });

// return the model

module.exports = mongoose.model('queries', QuerySchema);
