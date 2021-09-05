const userService = require("../services/user.service");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {connection, handleDisconnect} = require("../services/db.sql");

const createUser = catchAsync(async (req, res) => {
    // const user = await userService.createUser(req.body);
    // res.status(httpStatus.CREATED).send(user);
    // VALIDATION
    let username = req.body.username || "Not Given";
    let name = req.body.name;
    let token = req.body.token || "";

    connection.query(`INSERT INTO users VALUES(null, '${username}', '${name}', '${token}')`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.BAD_REQUEST).send({message:"User Already Exist!", error: error});
      } else {
        res.send(rows);
      }
    });

    
  });
  
  const getUsers = catchAsync(async (req, res) => {
    // const result = await userService.getUsers();
    // res.send(result);
    connection.query("SELECT * FROM users", (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't get Users.", error: error});
      } else {
        res.send(rows);
      }
    });
  });
  
  const getUser = catchAsync(async (req, res) => {
    // const user = await userService.getUserByEmail(req.params.userId);
    // if (!user) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    // }
    // res.send(user);
    connection.query(`SELECT * FROM users WHERE username = '${req.params.userId}'`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't get this User.", error: error});
      } else {
        res.send(rows);
      }
    });
  });

  const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(user);
  });

  const deleteUser = catchAsync(async (req, res) => {
    // await userService.deleteUserById(req.params.userId);
    // res.status(httpStatus.NO_CONTENT).send();
    connection.query(`DELETE FROM users WHERE username = '${req.params.userId}'`, (error, rows, fields) => {
      if (error) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).send({message: "Couldn't delete User.", error: error});
      } else {
        res.status(httpStatus.NO_CONTENT);
      }
    });
  });

  module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
  };