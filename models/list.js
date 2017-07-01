var cardSchema = require('../models/card.js')

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schema = new Schema({
    title: String,
    cards: [cardSchema.schema],
    id: String,
});

module.exports = mongoose.model("List", schema);
