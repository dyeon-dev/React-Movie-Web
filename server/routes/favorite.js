const express = require("express");
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {

    // request를 통해서 movieId를 받음
    // favoriteSchema에 있는 movieId와 프론트에서 보낸 movieId 정보가 같은 정보를 찾는다.
    Favorite.find({ "movieId": req.body.movieId })
    // mongoDB에서 쿼리를 돌려서 에러나 데이터를 처리해준다
    .exec((err, info) => {
        if(err) return res.status(400).send(err)
        // 프론트에 다시 favorite 숫자 정보 보내주기
        res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})

module.exports = router