const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  thumbnail: { type: Buffer, require: true },
  webpImage: { type: Buffer, require: true },
});

module.exports = model("Events", schema);
