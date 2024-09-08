const chatController = require("../routes/chat.controller");
const userController = require("../routes/user.controller");

module.exports = function(io) {
    io.on("connection", async(socket)=> {
        console.log("client is connected ", socket.id);

        socket.on("login", async(userName, cb) => {
            console.log("backend", userName);
            try{
                // 유저 정보를 저장
                const user = await userController.saveUser(userName, socket.id)
                cb({ok: true, data: user})
            } catch(err){
                cb({ok: false, error: err.message})
            }
        })

        socket.on("sendMessage", async(message,cb)=> {
            try{
                // socket id로 유저찾기
                const user = await userController.checkUser(socket.id)
                // 메세지 저장
                const newMessage = await chatController.saveChat(message, user)
                io.emit("message", newMessage)
                cb({ok: true})
            } catch(err){
                cb({ok: false, error: err.message})
            }
        })

        // 소켓 연결 해제
        socket.on("disconnect", () => {
            console.log("user is disconnected")
        })
    })
}