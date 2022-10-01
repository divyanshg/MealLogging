const { Schema, model } = require("mongoose");

/* Creating a new schema for the HashTag model. */
let hashTagsSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: String,
});

/* Exporting the model to be used in other files. */
module.exports = model("HashTags", hashTagsSchema);