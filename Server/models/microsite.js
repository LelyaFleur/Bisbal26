var mongoose = require('mongoose');

var phaseSchema = new mongoose.Schema({
    _id: false,
    phaseId: String,
    number: Number,
    name: String,
    title : String,
    message: String,
    date : String,
    description: String,
    visible: Boolean        
})

var iconSchema = new mongoose.Schema({
    _id: false,
    image : String,
    color: String    
})

var historialSchema = new mongoose.Schema({
    _id: false,
    title : String,
    body: String,
    button: String,
    url : String,
    file: String
})


var MicrositeSchema = new mongoose.Schema({
    title: String,
    whois: String,	
    dataProtection: String,
    activePhase: phaseSchema,
    phases : [phaseSchema],
    icons: [iconSchema],
    historial: {
        message: String,
        points: [historialSchema]
    }
})

module.exports = mongoose.model('microsites', MicrositeSchema);