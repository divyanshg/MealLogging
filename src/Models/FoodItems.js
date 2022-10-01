const { Schema, model } = require("mongoose")

/* Creating a new schema for the FoodItem model. */
let FoodItemSchema = new Schema({
    name: String,
})

/* Exporting the model to be used in other files. */
module.exports = model("FoodItems", FoodItemSchema)