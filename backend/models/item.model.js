/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

// eslint-disable-next-line new-cap
const itemSchema = mongoose.Schema(
    {
      name: {
        type: String,
      },

      type: {
        type: Number,
        required: true,
        default: 1,
      },

      // price: {
      //   type: Number,
      //   required: true,
      // },

      // qty: {
      //   type: Number,
      // },

      user: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
