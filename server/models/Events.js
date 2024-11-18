const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  image: {
    fullResData: Buffer,
    thumbnailData: Buffer,
    contentType: String,
    filename: String,
  }
});

module.exports = model("Events", schema);
