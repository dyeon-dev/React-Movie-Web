const chatController = require("../routes/chat.controller");
const userController = require("../routes/user.controller");

module.exports = function(io) {
    const connectedUsers = new Map(); // 연결된 사용자를 추적하기 위한 Map

    io.on("connection", async(socket)=> {
        console.log("client is connected ", socket.id);

        socket.on("login", async(userName, cb) => {
            console.log("backend", userName);
            try{
                // 유저 정보를 저장
                const user = await userController.saveUser(userName, socket.id)
                const welcomeMessage = {
                    chat: `${user.name}님이 입장하셨습니다`,
                    user: {id: null, name: "system"}
                }
                // 유저가 로그인 했을 때 웰컴 메세지 보내기
                io.emit("message", welcomeMessage)
                cb({ok: true, data: user})
            } catch(err){
                cb({ok: false, error: err.message})
            }
            // 사용자 정보를 Map에 저장
            connectedUsers.set(socket.id, { name: userName });
        })

        socket.on("sendMessage", async(message,cb)=> {
            try{
                // socket id로 유저찾기
                const user = await userController.checkUser(socket.id)
                // 메세지 저장
                const newMessage = await chatController.saveChat(message, user)
                // 서버에 접속한 모든 클라이언트들에게 메세지 전부 뿌리기 
                io.emit("message", newMessage)
                cb({ok: true})
            } catch(err){
                cb({ok: false, error: err.message})
            }
        })

        // 소켓 연결 해제
        socket.on("disconnect", async()=> {
            console.log("user is disconnected", socket.id)
             // 연결이 끊긴 사용자 정보 가져오기
             const disconnectedUser = connectedUsers.get(socket.id);
            
             if (disconnectedUser) {
                 // 퇴장 메시지 생성
                 const disconnectMessage = {
                     chat: `${disconnectedUser.name}님이 퇴장하셨습니다.`,
                     user: { id: null, name: "system" }
                 };
                 
                 // 모든 클라이언트에게 퇴장 메시지 전송
                 io.emit("message", disconnectMessage);
                 
                 // Map에서 사용자 정보 제거
                 connectedUsers.delete(socket.id);
             }
        })
    })
}