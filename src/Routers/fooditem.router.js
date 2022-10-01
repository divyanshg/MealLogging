const { Router } = require("express");
const FoodItems = require("../Models/FoodItems");
let router = Router();

router.get("/", async (req, res) => {
  try {
    let foodItems = await FoodItems.find();
    res.status(200).send(foodItems);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(
        "An error occured processing your request!\nPlease try again later."
      );
  }
});

//add foodItem
router.post("/", async (req, res) => {
  try {
    let items = req.body;
    
    if (items && items.length > 0) {
      items.forEach(async (item) => {
        let _item = await FoodItems.findOne({ name: item.name });
        if (_item) return;

        let foodItem = new FoodItems({
          name: item.name,
        });

        await foodItem.save();
      });

      res.status(200).send("Added food items successfully");
    } else {
      res.status(400).send("No food items found");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(
        "An error occured processing your request!\nPlease try again later."
      );
  }
});

module.exports = router;
