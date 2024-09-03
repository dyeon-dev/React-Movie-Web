const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//             Likes DisLikes
//=================================

router.post("/getLikes", (req, res) => {

    Like.find( { commentId: req.body.commentId })
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})

router.post("/getDislikes", (req, res) => {

    Dislike.find({ commentId: req.body.commentId })
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


// 좋아요 추가
router.post("/upLike", (req, res) => {
// Like Collection에다가 클릭 정보를 넣어준다.
    const like = new Like({ commentId: req.body.commentId , userId: req.body.userId })
    // MongoDB에 저장
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });

        // 만약 Dislike에 이미 클릭이 되었다면, Dislike을 1 줄여준다.
        Dislike.findOneAndDelete({ commentId: req.body.commentId , userId: req.body.userId })
        .exec((err, disLikeResult) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true })
        })
    })

})

// 좋아요 취소
router.post("/unLike", (req, res) => {

    Like.findOneAndDelete({ commentId: req.body.commentId , userId: req.body.userId })
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
})

// 싫어요 추가
router.post("/upDisLike", (req, res) => {

    const disLike = new Dislike({ commentId: req.body.commentId , userId: req.body.userId })

    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        // 만약 like에 이미 클릭이 되었다면, like을 1 줄여준다.
        Like.findOneAndDelete({ commentId: req.body.commentId , userId: req.body.userId })
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})


// 싫어요 취소
router.post("/unDisLike", (req, res) => {

    Dislike.findOneAndDelete({ commentId: req.body.commentId , userId: req.body.userId })
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})

module.exports = router;
