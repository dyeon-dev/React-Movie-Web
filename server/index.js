const express = require("express"); // express를 가져온다.
const app = express(); // express를 이용해서 app을 만들어준다.
const port = 5000; // port 번호를 5000번으로 설정
const socket_port=5001;

const bodyParser = require("body-parser"); // req.body
const cookieParser = require("cookie-parser");

const config = require("./config/key.js");

// application/x-www-form-urlencoded 타입의 url 파싱해서 데이터 가져올 수 있도록 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 온 데이터도 분석해서 가져올 수 있도록 함
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose // 몽구스를 이용해서 mongoDB에 연결
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

  app.use('/api/users', require('./routes/users'));
  app.use('/api/favorite', require('./routes/favorite'))
  app.use('/api/comment', require('./routes/comment'));
  app.use('/api/like', require('./routes/like'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // 클라이언트 주소에 맞게 수정
  }
});

require("./utils/io")(io);

httpServer.listen(socket_port, () => {
  console.log(`HTTP 서버와 Socket.IO 서버가 포트 ${socket_port}에서 실행 중입니다.`);
});