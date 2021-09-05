const ApiError = require("../utils/apiError");
const User = require("../models/user.model");
const httpStatus = require("http-status");

const createUser = async (userBody) => {
  
    // if (await User.isEmailTaken(userBody.username)) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    // }
    if (await getUserByEmail(userBody.username)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await User.create(userBody);
    return user;
};

const getUsers = async () => {
    const users = await User.find();
    return users;
};

const getUserById = async (id) => {
    return User.findById(id);
};

const getUserByEmail = async (email) => {
    return User.findOne({ username: email });
};

const updateUserById = async (userId, updateBody) => {
    const user = await getUserByEmail(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (userId) => {
    const user = await getUserByEmail(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
  };
  
  module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
  };