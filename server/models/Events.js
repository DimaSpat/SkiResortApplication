const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String },
  description: { type: String }
});

module.exports = model("Events", schema);
