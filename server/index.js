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


const port = 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
