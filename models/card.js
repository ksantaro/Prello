var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
  name: String,
  id: String,
  description: String,
  labels: Array,
  members: Array,
  comments: Array,
});

module.exports = mongoose.model("Card", schema);
