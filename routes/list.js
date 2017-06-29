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
      res.json(list);
    }
  });
});

router.patch("/:_id", function(req,res) {
  List.findOneAndUpdate({
    _id: req.params._id
  },
  {$set: {title: req.body.title,
         id: req.body.id }},
  {upsert: true},
  function(err, newList) {
    if (err) {console.log(err)
    } else {
      console.log(newList);
      res.status(204);
   }});
});

router.delete("/:_id", function(req,res) {
  console.log("One List");
  List.findOne({
    _id : req.params._id,
  })
    .exec(function(err, list) {
      if (err) {
        console.log(err);
      } else {
        List.remove(function(err, rList) {
          if (err) {console.log(err)
          } else {

          }
        })
        res.json(list);
      }
    });
});

module.exports = router;
