const {Schema, model} = require("mongoose");

/* Creating a new schema for the User model. */
let UserSchema = new Schema({
    id: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: String,
    password: String,
});

/* Exporting the model to be used in other files. */
module.exports = model("User", UserSchema);