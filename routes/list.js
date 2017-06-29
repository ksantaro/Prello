var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
//mongoose.connect('mongodb://localhost/prello'); // Port Num can be specified

var List = mongoose.model('List',
{
  title: String,
  cards: Array,
  id: String,
});

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
      console.log('meow');
      res.json(list);
    }
  });
});

router.patch("/", function(req,res) {

});

router.delete("/:_id", function(req,res) {
  
});

module.exports = router;
