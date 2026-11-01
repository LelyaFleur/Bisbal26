var mongoose = require('mongoose');

// Page Schema
var QueryInfoSchema = mongoose.Schema({   
    micrositeId: String,
    queryId: String,
    title: String,
    maxSelection: Number,
    instructions: String,
    faqs: String, 
    message1: String,    
    message2: String,
    message3: String,
    message4: String
},{ usePushEach: true });

 module.exports = mongoose.model("info", QueryInfoSchema);