/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

// eslint-disable-next-line new-cap
const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
      },

      name: {
        type: String,
      },

      type: {
        type: String,
        required: true,
        default: "Member",
      },

      token: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
);

userSchema.statics.isEmailTaken = async (username, excludeUserId) => {
    console.log(username);
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;

