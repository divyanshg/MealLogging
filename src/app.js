"use strict";

/* Loading the .env file. */
require("dotenv").config();

/* Importing the express module. */
const express = require("express");
const connectToDb = require("./Database")

const auth = require("./Middlewares/auth");

const MealsRouter = require("./Routers/meals.router")
const UserRouter = require("./Routers/user.router");
const FoodItemsRouter = require("./Routers/fooditem.router");
const HashTagRouter = require("./Routers/hashtag.router");

async function init(){
    const app = express();
    await connectToDb()

    /* Setting the port number to the port number that is set in the .env file. */
    let port = process.env.PORT;

    app.use(express.json())

    app.use("/api/user", UserRouter);
    app.use("/api/v1/foodItems", FoodItemsRouter);
    app.use("/api/v1/hashtags", HashTagRouter);
    
    app.use("/api/v1/meal", auth, MealsRouter);

    /* Listening to the port and logging the port number to the console. */
    app.listen(port, () => {
      console.log("Server started on : ", port);
    });
}

init()