const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: { type: String },
  password: { type: String }
});

module.exports = model("User", schema);
