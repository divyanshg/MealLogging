const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const Meals = require("../Models/Meals");
const FoodItems = require("../Models/FoodItems");
const HashTag = require("../Models/HashTag");

let router = Router();

router.get("/all", async (req, res) => {
  try {
    let userId = req.user.user_id;
    let meals = await Meals.find({ userId });

    res.status(200).send(meals);
  } catch (err) {
    console.log("GET ALL MEALS", err);
    res
      .status(500)
      .send(
        "An error occured processing your request!\nPlease try again later."
      );
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let userId = req.user.user_id;

    let { _doc: meal } = await Meals.findOne({ id, userId });

    res.status(200).send({ ...meal });
  } catch (err) {
    console.log("GET MEAL BY ID", err);
    res
      .status(500)
      .send(
        "An error occured processing your request!\nPlease try again later."
      );
  }
});

router.post("/", async (req, res) => {
  try {
    let { foodItems, hashTags } = req.body;
    let userId = req.user.user_id;
    let _continue = false

    /* Checking if the food item exists in the database. */
    for (let i = 0; i < foodItems.length; i++) {
      let { name } = foodItems[i];
      let foodItemExists = await FoodItems.findOne({ name });
      if (!foodItemExists) {
        _continue = false;
        return res
          .status(400)
          .send(
            `<span style="color: blue;">${name}</span> does not exist in the database`
          );
      }
      _continue = true;
    }

    if (!_continue) return;

    let meal = new Meals({
      id: uuidv4(),
      userId,
      foodItems,
      hashTags,
    });

    hashTags.forEach(async (tag) => {
      let hashTag = await HashTag.findOne({ name: tag });
      if (!hashTag) {
        hashTag = new HashTag({
          name: tag,
        });
        await hashTag.save();
      }
    });

    await meal.save();
    console.log("Meal saved successfully");

    res.status(200).send("Meal has been saved.");
  } catch (err) {
    console.log("POST MEAL", err);
    res
      .status(500)
      .send(
        "An error occured processing your request!\nPlease try again later."
      );
  }
});

module.exports = router;
