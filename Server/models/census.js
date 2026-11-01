var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Census = new Schema({
  document: String,
  passport: String,
  birthdate: String,
  postalCode: String,
  gender: String 
  
});

module.exports = mongoose.model('census', Census);
