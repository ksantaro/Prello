var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET users listing. */
router.get("/user/:email", function(req, res, next) {
  console.log("working");
  User.findOne({email: req.params.email}, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

router.get('/login', function(req, res, next) {
  User.find(function (err, list) {
    if (err) console.log(err);
    res.json(list); // Space Ghost is a talk show host.
  });
});

router.post("/login", function(req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user.save(user, function (err, newUser) {
    console.log("WHY IS IT SAVING");
    if (err) {
      var error = "Try again!";
      if (err.code === 11000) {
        var error = "Email is taken please try a new one";
      }
      res.redirect("../login");//, {emailError: error});
    } else {
      res.redirect("../boards");
    }
  })
});

router.post("/boards", function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (!user) {
      res.redirect('../login');//res.render("login", {error : "Invalid email or password"})
    } else {
      if (req.body.password === user.password) {
        req.session.user = user; // set-cookie: session={ email, password, nd stuff, Encrypted}
        res.redirect('../boards');
      } else {
        res.redirect('../login');//res.render("login", {error : "Invalid email or password"})
      }
    }
  });
});

router.get("/username", function(req, res, next) {
  res.json(res.locals.user.username);

});

module.exports = router;
