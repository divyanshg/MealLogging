const { Schema, model } = require("mongoose")

/* Creating a new schema for the Meal model. */
let MealsSchema = new Schema({
    id: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: String,
    foodItems: [
        {
            id: String,
            name: String,
        }
    ] ,
    hashTags: [
        {
            type: String,
        }
    ]
})

/* Exporting the model to be used in other files. */
module.exports = model("Meals", MealsSchema)