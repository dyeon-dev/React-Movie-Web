const { User } = require("../models/User");

// 클라이언트로부터 받아온 토큰을 decode 시켜서 인증 처리하는 곳
let auth = async (req, res, next) => {
    try {
      // 클라이언트 쿠키에서 토큰을 가져온다
      let token = req.cookies.x_auth;
      if(!token) {
        console.log(req)
        console.log(token)
        return res.json({ isAuth: false, error: true})
      }
  
      // 토큰을 복호화한 후 유저를 찾는다
      const user = await User.findByToken(token);
  
      // 유저가 없으면 인증 실패
      if (!user) {
        return res.status(401).json({
          isAuth: false,
          error: true,
          message: 'Authentication failed, user not found'
        });
      }
  
      // 유저가 있으면 인증 성공
      req.token = token;
      req.user = user;
      // 미들웨어에서 다음으로 넘어가는 것
      next();
    } catch (err) { 
      console.error('Authentication error:', err);
      return res.status(500).json({
        isAuth: false,
        error: true,
        message: 'Authentication error'
      });
    }
  };
  

module.exports = { auth };
