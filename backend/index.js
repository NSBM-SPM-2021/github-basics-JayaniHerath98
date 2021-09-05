const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const userController = require("./controllers/user.controller");
const itemController = require("./controllers/item.controller");

require("dotenv").config();


const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.route("/users")
    .get(userController.getUsers)
    .post(userController.createUser);

app.route("/users/:userId")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

app.route("/items")
    .get(itemController.getItems)
    .post(itemController.createItem);

app.route("/items/:itemId")
    .get(itemController.getItem)
    .patch(itemController.updateItem)
    .delete(itemController.deleteItem);

app.route("/items/byUser/:userId")
    .get(itemController.getItemsByUser);

app.route("/checkDate").post(itemController.checkDate);

app.listen(PORT, () => console.log("Running on "+PORT));

