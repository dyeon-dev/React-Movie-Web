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

// 대댓글 정보를 위해 댓글 정보 가져오기
router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
    .populate('writer')
    .exec((err, comments) => {
        if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});

// 댓글 수정
router.post("/editComment", (req, res) => {
    Comment.findOneAndUpdate(
      { _id: req.body.commentId },
      { content: req.body.content },
      { new: true }  // Return the updated document
    )
      .populate('writer')
      .exec((err, updatedComment) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, updatedComment });
      });
  });
  

// 댓글 삭제
router.post("/removeComment", (req, res) => {
    Comment.findOneAndDelete({ _id: req.body.commentId })
    .exec((err) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true })
    })
});

module.exports = router