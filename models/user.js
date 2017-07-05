var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userModel = new Schema({
  username: String,
  email: {type: String, unique: true},
  password: String,
});

module.exports = mongoose.model("users", userModel);
