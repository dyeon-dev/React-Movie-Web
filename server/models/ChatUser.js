const mongoose = require("mongoose"); // 몽구스를 가져온다.

const chatUserSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "User must type name"],
      unique: true,
    },
    socketId: {
        type: String,
      },
      online: {
        type: Boolean,
        default: false,
      }
    })

const chatUser = mongoose.model("chatUser", chatUserSchema); // 스키마를 모델로 감싸준다.

module.exports = { chatUser };