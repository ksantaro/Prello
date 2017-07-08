var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  name: String,
  id: String,
  description: String,
  "labels[]": { type: Array},
  members: { type: Array},
  comments: { type: Array},
  dates : { type: Array},
  users : { type: Array},
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
  user: String,
});

module.exports = mongoose.model("boards", boardSchema);
