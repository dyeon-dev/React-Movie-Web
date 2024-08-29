const mongoose = require("mongoose"); // 몽구스를 가져온다.
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userForm: {
      type: Schema.Types.ObjectId,
      ref: 'User', // ObjectId 하나의 정보로 user에 있는 모든 정보들을 가져올 수 있다.
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true })

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };