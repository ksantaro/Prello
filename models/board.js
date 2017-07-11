var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var cardSchema = require('../models/user.js');

var userSchema = new Schema({
  name : String,
  email : {type: String},
  id: String,
});

var memberSchema = new Schema({
  member: String,
});

var labelSchema = new Schema({
  label: String,
});

var commentSchema = new Schema({
  comment: String,
  user: String,
  date: String,
});

var cardSchema = new Schema({
  name: String,
  id: String,
  description: String,
  labels: [labelSchema],
  members: [memberSchema],
  comments: [commentSchema],
  //dates : { type: Array},
  //users : { type: Array},
})

var listSchema = new Schema({
  title: String,
  cards: [cardSchema],
  id: String,
});

var boardSchema = new Schema({
  name: String,
  id: String,
  lists: [listSchema],
  userID: String,
  userList: [userSchema]
});

module.exports = mongoose.model("boards", boardSchema);
