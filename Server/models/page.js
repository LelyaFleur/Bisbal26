var mongoose = require('mongoose');
var typeSchema = new mongoose.Schema({
    _id: false,
    name : String,
    type: String    
})
// Page Schema
var PageSchema = mongoose.Schema({   
    micrositeId: String,
    coverTitle: String,
    index: Number,
    phase: Number,
    type: typeSchema, 
    title: String,    
    image: String,
    content: String,
    note: String,
},{ usePushEach: true });

 module.exports = mongoose.model("pages", PageSchema);