
var mongoose = require('mongoose');


var CampusSchema = new mongoose.Schema({
  name: String,
  address: String
});



module.exports = mongoose.model('Campus', CampusSchema, 'campuses');
