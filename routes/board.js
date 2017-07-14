var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Board = require('../models/board.js');
var User = require('../models/user.js');
var io = require("../socketio");
router.get("/", requireLogin, function(req, res) {
  Board.find(function (err, board) {
    if (err) console.log(err);
    res.json(board);
  });
});

router.get("/:id", requireLogin,function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    if (err) {
      console.log(err);
    } else {
      res.json(board);
    }
  });
});

router.post('/', requireLogin, function(req,res) {
  var newBoard = new Board(
    { name: req.body.name,
      id: req.body.id,
      userID: req.body.userID, //Unique ID
      userList: [],
      lists: [],
    }
  );
  console.log(newBoard);
  newBoard.save(function (err, list) {
    if (err) {
      console.log(err);
    } else {

      console.log("Meow");
      res.json(list);
    }
  });
});



router.delete("/:id", requireLogin, function(req,res) {
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

router.patch("/:id", requireLogin, function(req,res) {
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

router.get("/:id/user/", requireLogin, function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    if (err) {
      console.log(err);
    } else {
      res.json(board.userList);
    }
  })
});

router.post("/:id/user/:email", requireLogin, function(req, res) {
  var userExsits = false;
  User.find(function(err,users) {
    console.log(users);
    console.log(req.params.email);
    console.log(users.length);
    for (var num = 0; num < users.length; num++) {
      console.log(users[num].email);
      if (users[num].email === req.params.email) {
        console.log("its true");
        userExsits = true;
      }
    }
    if (!userExsits) {
      console.log("user does not exsist");
      res.json("user does not exsist");
    }
    if (userExsits) {
      User.findOne({email: req.params.email}, function(err, user) {
        if(err) {
          res.json("user does not exsist");
        } else {
          Board.findOne({_id: req.params.id}, function(err, board) {
            var containsUser = false;
            for (var num = 0; num < board.userList.length; num++) {
              if (board.userList[num].email === user.email) {
                containsUser = true;
              }
            }
            if ((user._id + "" !== board.userID) && !(containsUser)) {
              var newUser =
                {
                  name: user.username,
                  email: user.email,
                };
                Board.findByIdAndUpdate(req.params.id,
                  {$push: {userList: newUser}},
                  {upsert: true}, function(err, user) {
                  if (err) console.log(err);
                  else res.json(newUser);
                });
            } else {
              res.json("user already in group");
            }
          });
        }
      });
    }

  });

});

router.delete("/:id/user/:id2", requireLogin, function(req, res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    var user = board.userList.id(req.params.id2);
    user.remove();
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.get("/:id/list/", requireLogin, function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    if (err) {
      console.log(err);
    } else {
      res.json(board.lists);
    }
  });
});

router.post("/:id/list/", requireLogin, function(req,res) {
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
    if (err) {console.log(err);}
    else {
      //io.getInstance().emit();
      console.log("11111111111111111111");
      io.getInstance().emit("newList", newList);
      console.log("22222222222222222222");
      res.json(list);
      //boradcastIoemit new card, for everyone emit new list io.getInstance().emit
    }
  });
});
router.patch("/:id/list/:id2", requireLogin, function(req,res) {
    console.log(req.body);
    /*Board.update(
      {'lists._id' : mongoose.Types.ObjectId(req.params.id2)},
      {$set: {"lists.$" : req.body}},
      {upsert: true}
    ).then(function(err, updatedList) {
      res.end();
    });*/
    Board.findOne({_id: req.params.id}, function(err, board) {
      var list = board.lists.id(req.params.id2);
      list.title = req.body.title;
      list.id = req.body.id;
      board.save(function(err, board) {
        if (err) {
          console.log(err);
        } else {
          res.json(board);
        }
      });
    });
});

router.delete("/:id/list/:id2", requireLogin, function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    var list = board.lists.id(req.params.id2);
    list.remove();
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.post("/:id/list/:id2/card", requireLogin, function(req,res) {
  var newCard =
    {
      name: '',
      id: '',
      description: '',
      labels: [],
      members: [],
      comments : [],
  };
  Board.update(
    {'lists._id' : mongoose.Types.ObjectId(req.params.id2)},
    {$push: {"lists.$.cards" : newCard}},
    {upsert: true}
  ).then(function(err, updatedList) {
    res.json(updatedList);
  });
});
//BoardID ListID CardID
router.patch("/:id/list/:id2/card/:id3", requireLogin, function(req,res) {
  console.log(req.body);
  console.log("UP HERE");
  Board.findOne({_id: req.params.id}, function(err, board) {
    var card = board.lists.id(req.params.id2).cards.id(req.params.id3);
    card.name = req.body.name;
    card.id = req.body.id;
    card.description = req.body.description;
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.delete("/:id/list/:id2/card/:id3", requireLogin, function(req,res) {
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

router.post("/:id/list/:id2/card/:id3/label", requireLogin, function(req,res) {
  var newLabels = {
    label : req.body.label,
  }
  Board.findOne({_id: req.params.id}, function(err, board) {
    var card = board.lists.id(req.params.id2).cards.id(req.params.id3);
    card.labels.push(newLabels);
    board.save(function (err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.delete("/:id/list/:id2/card/:id3/label/:id4", requireLogin, function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    var label = board.lists.id(req.params.id2).cards.id(req.params.id3).labels.id(req.params.id4);
    label.remove();
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.post("/:id/list/:id2/card/:id3/member", requireLogin, function(req,res) {
  var newMember = {
    member : req.body.member,
  }
  Board.findOne({_id: req.params.id}, function(err, board) {
    var card = board.lists.id(req.params.id2).cards.id(req.params.id3);
    card.members.push(newMember);
    board.save(function (err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.delete("/:id/list/:id2/card/:id3/member/:id4", requireLogin, function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    var member = board.lists.id(req.params.id2).cards.id(req.params.id3).members.id(req.params.id4);
    member.remove();
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.post("/:id/list/:id2/card/:id3/comment", requireLogin, function(req,res) {
  var newComment = {
    comment : req.body.comment,
    user : req.body.user,
    date : req.body.date,
  }
  Board.findOne({_id: req.params.id}, function(err, board) {
    var card = board.lists.id(req.params.id2).cards.id(req.params.id3);
    card.comments.unshift(newComment);
    board.save(function (err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

router.delete("/:id/list/:id2/card/:id3/comment/:id4", requireLogin, function(req,res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    var comment = board.lists.id(req.params.id2).cards.id(req.params.id3).comments.id(req.params.id4);
    comment.remove();
    board.save(function(err, board) {
      if (err) {
        console.log(err);
      } else {
        res.json(board);
      }
    });
  });
});

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = router;
