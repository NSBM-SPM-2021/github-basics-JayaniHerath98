const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {connection} = require("../services/db.sql");

const createBook = catchAsync(async (req, res) => {
    // VALIDATION
    let name = req.body.name || "Not Given";
    let description = req.body.description || "Nothing Mentioned";
    let author = req.body.author || "Not Specified";
    let published = req.body.published || "Not Specified";
    let type = req.body.category;
    let qty = req.body.qty || "Not Specified";

    connection.query(`INSERT INTO books(name, description, author, category, published, qty) VALUES('${name}', '${description}', '${author}', '${type}', '${published}', ${qty})`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't create Book", error: error});
      } else {
        res.send(rows);
      }
    });

  });
  
  const getBooks = (req, res) => {
    connection.query("SELECT * FROM books", (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't Get Books", error: error});
      } else {
        res.send(rows);
      }
    });
  };
  
  const getBook = catchAsync(async (req, res) => {
    connection.query(`SELECT * FROM books WHERE id = ${req.params.bookId}`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't get Book", error: error});
      } else {
        res.send(rows);
      }
    });
  });

  const getBooksByUser = catchAsync(async (req, res) => {
    connection.query(`SELECT * FROM books WHERE user = '${req.params.userId}'`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't get this User's Books", error: error});
      } else {
        res.send(rows);
      }
    });
  });

  const updateBook = catchAsync(async (req, res) => {
    let id = req.params.bookId;
    let name = req.body.name;
    let description = req.body.description;
    let author = req.body.author;
    let published = req.body.published;
    let category = req.body.category;
    let qty = req.body.qty;
    connection.query(`UPDATE books SET ? WHERE id = ${id}`, [{name, description, author, published, category, qty}], (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't get Book", error: error});
      } else {
        res.send(rows);
      }
    });
  });

  const deleteBook = catchAsync(async (req, res) => {
    connection.query(`DELETE FROM books WHERE id = ${req.params.bookId}`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't delete this Book", error: error});
      } else {
        res.status(httpStatus.NO_CONTENT).send({message:"Book Deleted Succesfully"});
      }
    });
    // req.setTimeout(10000, () => {
    //   console.log("Taking Time");
    //   res.send("Taking Time");
    //   req.abort();
    // })
    setTimeout(() => res.end(), 10000);
  });

  // const checkDate = catchAsync(async (req, res) => {
  //   let date = req.body.date;
  //   let user = req.body.user;
  //   let type = req.body.type;

  //   connection.query(`SELECT FROM schedules WHERE date = ${date} AND user = ${user} AND type = ${type}`, (error, rows, fields) => {
  //     if (error) {
  //       res.send({data:null, isAvailable:false});
  //     } else {
  //       res.send({data:"Some Data", isAvailable:true});
  //     }
  //   });
  // });
  

  module.exports = {
    createBook,
    getBooks,
    getBook,
    getBooksByUser,
    updateBook,
    deleteBook
  };