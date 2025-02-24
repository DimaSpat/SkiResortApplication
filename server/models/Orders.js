const { Schema, model } = require('mongoose');

const schema = new Schema({
    id: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = model("Orders", schema);