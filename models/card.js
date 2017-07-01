var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
  name: String,
  id: String,
  description: String,
  labels: [{type: String}],
  members: [{type: String}],
  comments: [{type: String}],
});

module.exports = mongoose.model("Card", schema);
