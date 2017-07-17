var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passHash = require('password-hash');


/* GET users listing. */
router.get("/user/:email", function(req, res, next) {
  User.findOne({email: req.params.email}, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

router.get("/users/:id", function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
})

router.get('/login', function(req, res, next) {
  User.find(function (err, list) {
    if (err) console.log(err);
    res.json(list); // Space Ghost is a talk show host.
  });
});

router.post("/login", function(req, res) {
  var passwordHash = passHash.generate(req.body.password);
  console.log("generated");
  console.log(passwordHash);
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
  });
  user.save(user, function (err, newUser) {
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
  var passwordHash = passHash.generate(req.body.password);
  var password = req.body.password
  console.log("COMPARE");
  console.log(passwordHash);

  User.findOne({email: req.body.email}, function(err, user) {
    if (!user) {
      res.redirect('../login');//res.render("login", {error : "Invalid email or password"})
    } else {
      console.log(user.password);
      console.log(passHash.verify(password, user.password));
      if (passHash.verify(password, user.password)) {
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
