var _ = require('lodash');
var Campus = require('../models/campus');


exports.get = function(req, res) {
  var searchQuery = req.query.search;
  var query = Campus.find({$text : {$search: '"' + searchQuery + '"'}}, {name: 1, _id: 1});
  query.exec(function(err, campuses) {
    if(!err){
      res.json(campuses);
    }
    else{
      console.log('Error in campuses query');
    }
  });
};
