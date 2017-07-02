var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
  name: String,
  id: String,
  description: String,
  'labels[]': { type: Array},
  'members[]': { type: Array},
  'comments[]': { type: Array},
});

module.exports = mongoose.model("Card", schema);
