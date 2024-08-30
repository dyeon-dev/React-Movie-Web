const express = require("express");
const router = express.Router();
const { Comment } = require('../models/Comment');

//=================================
//             Comment
//=================================

// 댓글 저장
router.post('/saveComment', (req, res) => {
    // 받아온 데이터를 저장
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        // id로 찾아서 모든 writer의 정보를 가져온다.
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})


module.exports = router