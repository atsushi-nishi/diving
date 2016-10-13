var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var LocationSchema = new Schema({
  locationId: {
    type: Number, required: true,
  },
  countryCode: {
    type: String, required: true,
  },
  state: {
    type: String, required: true,
  },
  
  // chiiki like higashi-izu

  locationNameEn: {
    type: String, required: true,
  },

  locationNameJPKangi: {
    type: String, required: true,
  },

  locationNameJPKana: {
    type: String, required: true,
  },

}; 


mongoose.model('Log', LogSchema);
var Log = mongoose.model('Log');


module.exports = {
  index: function(req, res){
    console.log("[func]locations:index");

  },
};









