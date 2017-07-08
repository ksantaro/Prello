var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Board = require('../models/board.js');

router.get("/", function(req, res) {
  Board.find(function (err, board) {
    if (err) console.log(err);
    res.json(board);
  });
});

router.get("/:id",function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    if (err) {
      console.log(err);
    } else {
      res.json(board);
    }
  });
});

router.post('/', function(req,res) {
  var newBoard = new Board(
    { name: req.body.name,
      id: req.body.id,
      user: req.body.user,
      lists: [],
    }
  );
  newBoard.save(function (err, list) {
    if (err) {
      console.log(err);
    } else {
      console.log("Meow");
      res.json(list);
    }
  });
});



router.delete("/:id", function(req,res) {
  Board.findOneAndRemove({
    _id: req.params.id
  }, function(err, board) {
    if(err) {
      console.log(err);
    } else {
      console.log(board);
      res.json(board);
    }
  });
});

router.patch("/:id", function(req,res) {
  Board.findOneAndUpdate({
    _id: req.params.id
  },
  {$set: {name: req.body.name,
         id: req.body.id }},
  {upsert: true},
  function(err, newBoard) {
    if (err) {console.log(err)
    } else {
      res.json(newBoard);
   }});
});

router.get("/:id/list/", function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    if (err) {
      console.log(err);
    } else {
      res.json(board.lists);
    }
  });
});

router.post("/:id/list/", function(req,res) {
  var newList =
    {
      title: req.body.title,
      id: req.body.id,
      cards: [],
    }
  ;
  Board.findByIdAndUpdate(req.params.id, {
    $push: {lists: newList}
  }, {upsert: true}, function(err, list) {
    if (err) console.log(err);
    else res.json(list);
  });
});
router.patch("/:id/list/:id2", function(req,res) {
    console.log(req.body);
    Board.update(
      {'lists._id' : mongoose.Types.ObjectId(req.params.id2)},
      {$set: {"lists.$" : req.body}},
      {upsert: true}
    ).then(function(err, updatedList) {
      res.end();
    });
});

router.delete("/:id/list/:id2", function(req,res) {
    Board.update(
      {_id : req.params.id},
      {$pull: {lists: { _id: req.params.id2}}},
      {upsert: false},
      function(err, updatedBoard) {
        console.log(err);
        console.log(updatedBoard);
        res.json(updatedBoard);
      });
});

router.post("/:id/list/:id2/card", function(req,res) {
  var newCard =
    {
      name: '',
      id: '',
      description: '',
      "labels[]": [],
      members: [],
      comments : [],
      dates : [],
      users : [],
  };
  Board.update(
    {'lists._id' : mongoose.Types.ObjectId(req.params.id2)},
    {$push: {"lists.$.cards" : newCard}},
    {upsert: true}
  ).then(function(err, updatedList) {
    res.end();
  });
});
//BoardID ListID CardID
router.patch("/:id/list/:id2/card/:id3", function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    var card = board.lists.id(req.params.id2).cards.id(req.params.id3);
    card.name = req.body.name;
    card.id = req.body.id;
    card.description = req.body.description;
    card.labels = req.body.labels;
    card.members = req.body.members;
    card.comments = req.body.comments;
    card.dates = req.body.dates;
    card.users = req.body.users;
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.delete("/:id/list/:id2/card/:id3", function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    var card = board.lists.id(req.params.id2).cards.id(req.params.id3);
    card.remove();
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});


module.exports = router;
