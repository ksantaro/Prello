var express = require('express');
var mongoose = require('mongoose');
var List = require('../models/list.js');
var Card = require('../models/card.js')

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
      name: req.body.name,
      id: req.body.id,
      description: req.body.description,
      labels: req.body.labels,
      members: req.body.members,
      comments: req.body.comments,
    }
  );
  List.findOneAndUpdate({
    _id: req.params.id
  },
  {$push: {cards: newCard}},
  {upsert: true},
  function(err, newCard) {
    if (err) {console.log(err)
    } else {
      console.log(newCard);
      res.json();
   }});
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
      console.log(newList);
      res.json(newList);
   }});
});

router.patch("/:id/card/:id2", function(req,res) {
  List.update(
    {'cards._id' : mongoose.Types.ObjectId(req.params.id2)},
    {$set: {"cards.$": req.body}},
    {new: true}
  ).then(function(err, updatedList) {
    console.log(err);
    console.log(updatedList);
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
