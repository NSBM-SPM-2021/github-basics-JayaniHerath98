const itemService = require("../services/item.sql.service");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {connection} = require("../services/db.sql");

const createItem = catchAsync(async (req, res) => {
    // VALIDATION
    let name = req.body.name || "Not Given";
    let type = req.body.type;
    let user = req.body.user || "Not Specified";

    connection.query(`INSERT INTO items VALUES(null, '${name}', ${type}, '${user}')`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't create Item", error: error});
      } else {
        res.send(rows);
      }
    });

  });
  
  const getItems = (req, res) => {
    connection.query("SELECT * FROM items", (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't Get Items", error: error});
      } else {
        res.send(rows);
      }
    });
  };
  
  const getItem = catchAsync(async (req, res) => {
    connection.query(`SELECT * FROM items WHERE id = ${req.params.itemId}`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't get Item", error: error});
      } else {
        res.send(rows);
      }
    });
  });

  const getItemsByUser = catchAsync(async (req, res) => {
    connection.query(`SELECT * FROM items WHERE user = '${req.params.userId}'`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't get this User's items", error: error});
      } else {
        res.send(rows);
      }
    });
  });

  const updateItem = catchAsync(async (req, res) => {
    const item = await itemService.updateItemById(req.params.itemId, req.body);
    res.status(httpStatus.CREATED).send(item);
  });

  const deleteItem = catchAsync(async (req, res) => {
    connection.query(`DELETE FROM items WHERE id = ${req.params.itemId}`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't delete this Item", error: error});
      } else {
        res.status(httpStatus.NO_CONTENT).send({message:"Item Deleted Succesfully"});
      }
    });
    // req.setTimeout(10000, () => {
    //   console.log("Taking Time");
    //   res.send("Taking Time");
    //   req.abort();
    // })
    setTimeout(() => res.end(), 10000);
  });

  const checkDate = catchAsync(async (req, res) => {
    let date = req.body.date;
    let user = req.body.user;
    let type = req.body.type;

    connection.query(`SELECT FROM schedules WHERE date = ${date} AND user = ${user} AND type = ${type}`, (error, rows, fields) => {
      if (error) {
        res.send({data:null, isAvailable:false});
      } else {
        res.send({data:"Some Data", isAvailable:true});
      }
    });
  });
  

  module.exports = {
    createItem,
    getItems,
    getItem,
    getItemsByUser,
    updateItem,
    deleteItem,
    checkDate
  };