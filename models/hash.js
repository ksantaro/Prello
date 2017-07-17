var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
  email: String,
  hashKey: String,
});

module.exports = mongoose.model("hash", schema);
