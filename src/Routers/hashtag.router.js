const { Router } = require("express");
const HashTag = require("../Models/HashTag");
let router = Router();

router.get("/", async (req, res) => {
    try {
        let hashTags = await HashTag.find();
        res.status(200).send(hashTags);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occured processing your request!\nPlease try again later.");
    }
});

module.exports = router;
