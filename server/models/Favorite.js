const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,  // ObjectId 하나의 정보로 user에 있는 모든 정보들을 가져올 수 있다.
        ref: 'User' // User에 생성된 모든 정보를 가져온다.
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
    },
    movieDate: {
        type: String
    },
    movieImage: {
        type: String
    }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }