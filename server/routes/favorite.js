const express = require("express");
const router = express.Router();
const { Favorite } = require('../models/Favorite');

// 좋아요수 반환
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

// 저장된 좋아요인지 반환
router.post('/favorited', (req, res) => {
    // 내가 이 영화를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기
    // favoriteSchema에 있는 movieId, userFrom와 프론트에서 보낸 movieId, userFrom 정보가 같은 정보를 찾는다.
    Favorite.find({ "movieId": req.body.movieId , "userFrom": req.body.userFrom})
    // mongoDB에서 쿼리를 돌려서 에러나 데이터를 처리해준다
    .exec((err, info) => {
        if(err) return res.status(400).send(err)

        // favorite에 영화를 저장하지 않았다고 해놓음
        let result = false
        if(info.length!=0) {
            // favorite 수가 0이상이면 결과를 true로 반환
            result=true
        }

        // 프론트에 다시 favorited 결과 정보 보내주기
        res.status(200).json({ success: true, favorited: result })
    })
})

// 좋아요 삭제
router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, doc })
    })
})

// 좋아요 추가
router.post('/addToFavorite', (req, res) => {
    // Favorite 데이터베이스에 req.body를 넣어준다
    const favorite = new Favorite(req.body)
    favorite.save((err, doc)=> {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, doc })
    })
})

// 좋아요 리스트 반환
router.post('/getFavoriteMovie', (req, res) => {
    // userFrom 필드가 req.body.userFrom의 값과 일치하는 favorites 컬렉션의 모든 문서를 검색
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            if (favorites.length === 0) {
                console.log("No favorite movies found for this user.");
            }
            return res.status(200).json({ success: true, favorites });
        });
});

module.exports = router