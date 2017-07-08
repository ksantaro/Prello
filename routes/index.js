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

/* GET home page. */
router.get('/index/:id', function(req, res, next) {
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

router.get("/test", function(req, res) {
  res.send("hihihihih");
});

router.get("/username", function(req, res, next) {
  res.json(req.session.user.username);
});
/*
router.get('/:id', function(req, res) {
  res.render('index', {uID : req.params.id});
});
*/
module.exports = router;
