const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,  // ObjectId 하나의 정보로 user에 있는 모든 정보들을 가져올 수 있다.
        ref: 'User' // User에 생성된 모든 정보를 가져온다.
    },
    movieId: {
        type: String
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }