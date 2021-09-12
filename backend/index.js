const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const userController = require("./controllers/user.controller");
const bookController = require("./controllers/book.controller");

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

app.route("/books")
    .get(bookController.getBooks)
    .post(bookController.createBook);

app.route("/books/:bookId")
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

// app.route("/books/byUser/:userId")
//     .get(bookController.getbooksByUser);


app.listen(PORT, () => console.log("Running on "+PORT));

