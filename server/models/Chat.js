const mongoose = require("mongoose"); // 몽구스를 가져온다.

const chatSchema = new mongoose.Schema(
    {
        chat: String,
        user: {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "chatUser",
            },
            name: String,
        },
    },
    {timestamp: true}
);

const Chat = mongoose.model("Chat", chatSchema); // 스키마를 모델로 감싸준다.

module.exports =  Chat ; 