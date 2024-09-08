const { chatUser }  = require("../models/ChatUser");
const userController = {}

// 유저 정보 저장
userController.saveUser = async(userName, sid) => {
    // 이미 있는 유저인지 확인
    let user = await chatUser.findOne({name: userName})
    // 없다면 새로 유저정보 만들기
    if (!user) {
        user = new chatUser({
            name:userName, 
            socketId: sid,
            online: true
    })
    }
    // 이미 있는 유저라면 연결정보 socketId 값만 바꿔주기
    user.socketId = sid
    userController.online = true

    await user.save()
    return user;
}


userController.checkUser = async(sid) => {
    const user = await chatUser.findOne({socketId: sid})
    if (!user) throw new Error("user not found")
        return user;
}

module.exports = userController