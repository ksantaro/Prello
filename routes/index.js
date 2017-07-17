var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var sessions = require('client-sessions');
var User = require('../models/user.js');
var Hash = require('../models/hash.js')
var passHash = require('password-hash');

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/* GET home page. */
router.get('/index/:id', function(req, res, next) {
  if (req.session && req.session.user) {
    console.log("session is made");
    User.findOne({ email: req.session.user.email}, function (err,user) {
      if (!user) {
        req.session.reset();
        req.redirect('/login');
      } else {
        //res.locals.user = user;
        console.log("INDEX");
        res.render('index.ejs', {url : req.params.id});
      }
    });
  } else {
    res.redirect('/login');
  }
  res.render('index.ejs', {url : req.params.id});
});

router.get('/', function(req, res, next) {
  if (req.session && req.session.user) {
    console.log("session is made");
    User.findOne({ email: req.session.user.email}, function (err,user) {
      if (!user) {
        req.session.reset();
        req.redirect('/login');
      } else {
        //res.locals.user = user;
        console.log("INDEX");
        res.render('index', {username: user.username});
      }
    });
  } else {
    res.redirect('/login');
  }
  res.render('index', { title: 'Express' });
});



router.post("/confirmEmail", function(req, res) {
  console.log("CONGOriojgwORJG");
  var email = req.body.email;
  var userExsits = false;
  var emailResponse;
  User.find(function(err,users) {
    for (var num = 0; num < users.length; num++) {
      if (users[num].email === email) {
        userExsits = true;
      }
    }
    if (!userExsits) {
      //res.json("user does not exsist");
      emailResponse = "email does not exsit";
      res.render("forgot-password.ejs", {email: emailResponse})
    } else {
      //Link to reset-password
      var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      var emailHash = passHash.generate(email);
      var keyHash = rString + emailHash;
      //userpasswordhash + randomhash
      var newHash = new Hash(
        { hashKey: keyHash,
          email: email,
        }
      );
      newHash.save(function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          //res.json(hash);
        }
      });
      //store in db hash {hashkey, email}
      //res.json("user exsists");
      emailResponse = "email exsists";
      console.log("WORKING UP TO HERE");
      res.render("link-to-reset.ejs", {hashKey: keyHash});
    }
  });
});

router.get("/reset-password/:hashKey", function(req,res) {
  var hashKey = req.params.hashKey;
  Hash.findOne({hashKey: hashKey}, function(err, hash) {
    if (err) {
      console.log(err);
    } else {
      console.log("Hash.email");
      console.log("LOOKING FOR USER");
      User.findOne({email: hash.email}, function(err, user) {
        if (err) {
          console.log(err);
        } else {
          console.log("reset-password", user._id, hashKey);
          res.render("reset-password.ejs", {_id: user._id, hashKey: hashKey});
        }
      });
    }
  });
  //later in reset-password - render a reset passwordform the user email using the random hash
    //EX /hash/:hashkey - looks for the hashkey in email and renders the users email
  //in reset-password - reset new password (also hased) onSumbit delete the hashkey
});

router.post("/reset-password/:hashKey/user/:id", function(req,res) {
  var passwordHash = passHash.generate(req.body.password);

  User.findOneAndUpdate({
    _id: req.params.id
  },
  {$set: {password: passwordHash}},
  {upsert: true},
  function(err, newUser) {
    if (err) {console.log(err)
    } else {
      Hash.findOneAndRemove({
        hashKey: req.params.hashKey
      }, function(err, hash) {
        if(err) {
          console.log(err);
        } else {
          //res.json(board);
        }
      });
   }});
});

router.get("/test", function(req, res) {
  res.send("hihihihih");
});

router.get("/username", function(req, res, next) {
  res.json(req.session.user.username);
});

router.get("/email", function(req,res,next) {
  res.json(req.session.user.email);
});

router.get("/uniqueID", function(req,res,next) {
  res.json(req.session.user._id);
});
/*
router.get('/:id', function(req, res) {
  res.render('index', {uID : req.params.id});
});
*/
module.exports = router;
