var express = require('express');
var mongoose = require('mongoose');
var List = require('../models/list.js');
var Card = require('../models/card.js');
var Board = require('../models/board.js');

var router = express.Router();
//mongoose.connect('mongodb://localhost/prello'); // Port Num can be specified



//var Card = mongoose.model("Card");






router.get("/", function(req, res) {
//  res.send("hihihihih");
  List.find(function (err, list) {
    if (err) console.log(err);
    res.json(list); // Space Ghost is a talk show host.
  });

});

router.post("/", function(req,res) {
  var newList = new List(
    { title: req.body.title,
      id: req.body.id
    }
  );
  newList.save(function (err, list) {
    if (err) {
      console.log(err);
    } else {
      console.log("Meow");
      res.json(list);
    }
  });
});

router.post("/:id/card/", function(req,res) {
  var newCard = new Card(
    {
      name: '',
      id: '',
      description: '',
      'labels[]': [],
      'members[]': [],
      'comments[]' : [],
      'dates[]' : [],
      'users[]' : [],
    }
  );
  List.findByIdAndUpdate(req.params.id, {
    $push: {cards: newCard}
  }, {upsert: true}, function(err, card) {
    if (err) console.log(err);
    else res.json(card);
  });
  /*
  List.findOneAndUpdate({
    _id: req.params.id
  },
  {$push: {cards: newCard}},
  {upsert: true},
  function(err, newCard) {
    if (err) {console.log(err)
    } else {
      res.json();
   }});
   */
   //res.json();
});

router.patch("/:id", function(req,res) {
  List.findOneAndUpdate({
    _id: req.params.id
  },
  {$set: {title: req.body.title,
         id: req.body.id }},
  {upsert: true},
  function(err, newList) {
    if (err) {console.log(err)
    } else {
      res.json(newList);
   }});
});

router.patch("/:id/card/:id2", function(req,res) {
  console.log(req.body);
  console.log(req.body.members);
  List.update(
    {'cards._id' : mongoose.Types.ObjectId(req.params.id2)},
/*
    {$set: {"cards.$.name" : req.body.name,
            "cards.$.description" : req.body.description,
            "cards.$.id" : req.body.id,
            "cards.$._id" : req.body._id,//},
            "cards.$.members" : req.body.members,
            "cards.$.comments" : req.body.comments,
            "cards.$.labels" : req.body.labels,
          }},*/
    /*
     $push: {"cards.$.members" : req.body.members,
             "cards.$.comments" : req.body.comments,
             "cards.$.labels" : req.body.labels}},
             */
    {$set: {"cards.$" : req.body}},
    {upsert: true}
  ).then(function(err, updatedList) {
    res.end();
  });
});

router.delete("/:id", function(req,res) {
  List.findOneAndRemove({
    _id: req.params.id
  }, function(err, list) {
    if(err) {
      console.log(err);
    } else {
      console.log(list);
      res.json(list);
    }
  });
});

router.delete("/:id/card/:id2", function(req,res) {
  List.update(
    {_id : req.params.id},
    {$pull: {cards: { _id: req.params.id2}}},
    {upsert: false},
    function(err, updatedList) {
      console.log(err);
      console.log(updatedList);
      res.json(updatedList);
    });
});

module.exports = router;
