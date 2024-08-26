const express = require('express')
const app = express()

const bodyParser = require('body-parser') // req.body
const cookieParser = require('cookie-parser');
// cookie parser 사용
app.use(cookieParser());

// application/x-www-form-urlencoded 타입의 url 파싱해서 데이터 가져올 수 있도록 함
app.use(bodyParser.urlencoded({extended: true}))
// application/json 타입으로 온 데이터도 분석해서 가져올 수 있도록 함 
app.use(bodyParser.json())

const config = require('./config/key')
const { User } = require("./models/User");

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

app.get('/', (req, res)=>res.send('Hello'))

// 회원가입
app.post('/api/users/register', async (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면 DB에 넣어준다.
    const user = new User(req.body)
    try {
        const userInfo = await user.save() // save() : 몽고db에서 오는 메서드 
        return res.status(200).json({
            success: true,
            userInfo
        })
    } catch (err) {
        return res.status(400).json({ success: false, err })
    }
})

// 로그인
app.post("/api/users/login", (req, res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (!user) {
          return res.json({
            loginSuccess: false,
            message: "이메일에 해당하는 유저가 없습니다.",
          });
        }
        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            return res.json({
              loginSuccess: false,
              message: "비밀번호가 틀렸습니다.",
            });
          }
          // 비밀번호까지 맞다면 토큰 생성
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지, 세션 등등
            res
              .cookie("x_auth", user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });
          });
        });
      }
    );
  });
  

const port = 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
