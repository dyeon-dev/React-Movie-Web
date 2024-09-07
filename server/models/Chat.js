const mongoose = require("mongoose"); // 몽구스를 가져온다.

const userSchema = mongoose.Schema(
    {
        chat: String,
        user: {
            id: {
                type: mongoose.Schema.objectId,
                ref: "User",
            },
            name: String,
        },
    },
    {timestamp: true}
);

const Chat = mongoose.model("Chat", userSchema); // 스키마를 모델로 감싸준다.

module.exports = { Chat }; 