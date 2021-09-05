/* eslint-disable linebreak-style */
const ApiError = require("../utils/apiError");
const Item = require("../models/item.model");
const httpStatus = require("http-status");
const {connection} = require("../services/db.sql");

const createItem = async (itemBody) => {
    // pool.query()
    const item = await Item.create(itemBody);
    return item;
};

const getItems = () => {
    connection.query("SELECT * FROM test", (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        return rows;
      }
    });
};

const getItemsByUser = async (userId) => {
  const items = await Item.find({user: userId});
  return items;
};

const getItemById = async (id) => {
    return Item.findById(id);
};

const updateItemById = async (itemId, updateBody) => {
    const item = await getItemById(itemId);
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    Object.assign(item, updateBody);
    await item.save();
    return item;
};

const deleteItemById = async (itemId) => {
    const item = await getItemById(itemId);
    if (!item) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    await item.remove();
    return item;
  };
  
  module.exports = {
    createItem,
    getItems,
    getItemsByUser,
    getItemById,
    updateItemById,
    deleteItemById,
  };