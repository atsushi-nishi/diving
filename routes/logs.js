var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var LogSchema = new Schema({
  logNumber: {
    type: Number, required: true,
  },
  diverId: {
    type: Number, required: true,
  },
  diveDate: {
    type: Date, required: true,
  },
  diveLocationId: {
    type: Number, required: true,
  },
  divePoint: {
    type: String, required: false,
  },
  /*
  diveType: {
    type: String, required: true,
  },
  */
  waterEntryKind: {
    type: String, required: false,
  },
  topographyLocationKind: {
    type: String, required: false,
  },
  wavesKind: {
    type: String, required: false,
  },
  currentKind: {
    type: String, required: false,
  },
  visibility: {
    type: Number, required: false,
  },
  createdAt: {
    type: Date, required: true,
  },
  updatedAt: {
    type: Date, required: true,
  },
});

mongoose.model('Log', LogSchema);
var Log = mongoose.model('Log');


var diverId = 1; // ToDo


module.exports = {
  index: function(req, res){
    console.log("[func]logs:index");

    Log.findById(id, function(err, docs) {
    if (err) console.log("err: %s", err);
    res.json(docs);
    }).sort({logNumber:-1});
  }
  ,new: function(req, res){
    res.send("new: called as GET method");
  }
  ,create: function(req, res) {
    console.log("[func]logs:create");
    console.log("req.body:", req.body);
    var log = new Log({
      logNumber: req.body.logNumber,
      diverId: diverId,
      diveDate: req.body.diveDate,
      diveLocationId: req.body.diveLocationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("[func]logs:create2");

    log.save(function (err) {
      console.log("[func]logs:create3");

      if (err) { 
        console.log("[info]failed saveLog ", err);
        //return handleError(err);
        throw err;
      }
      // saved!
      console.log("[info]saved log succeeded");
      return;
    });

    //res.send("create: called as POST method");
  }
  ,show: function(req, res) {
    console.log("[func]logs:show");
    var id = req.params.id;
    Log.findById(id, function(err, doc) {
      if (err) console.log("err: %s", err);
      res.json(doc);
    });
  }
  ,search: function(req, res) {
    console.log("[func]logs:search");
    var query = req.query;
    console.log("query:", query);
    console.log("[func]logs:search1", query);
    var sort = {};
    console.log("[func]logs:search2");
    if (query.sort) {
      console.log("[func]logs:search3", query.sort);
      sorts = query.sort.split(",");
      console.log("[func]logs:search4", sorts, sorts.length, sorts[0]);

      for (var i = 0; i < sorts.length; i++) {
        var _sort = sorts[i];
        console.log("[func]logs:search5", _sort);
        if (_sort.lastIndexOf('-', 0) === 0) {
          _sort = _sort.substr(1);
          console.log("[func]logs:search6", _sort);
          sort[_sort] = -1;
          console.log("[func]logs:search6-2", _sort, sort);
        } else {
          console.log("[func]logs:search7", _sort);
          sort[_sort] = 1;
        }
      };
    }
    console.log("[func]logs:search8", sort);
    Log.findOne({diverId: diverId}, {}, {"sort": sort}, function(err, doc) {
      if (err) console.log("err: %s", err);
      console.log("doc:", doc);
      res.json(doc);
    });
  }


  ,edit: function(req, res){
      res.send("edit: called as GET method");
  }
  ,update: function(req, res){
      res.send("update: called as PUT method");
  }
  ,destroy: function(req, res){
      res.send("destroy: called as DELETE method");
  }
};
