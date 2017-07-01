var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
    title: String,
    cards: Array,
    id: String,
});

module.exports = mongoose.model("List", schema);
