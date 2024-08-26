const mongoose = require("mongoose"); // 몽구스를 가져온다
const bcrypt = require("bcrypt"); // 비밀번호를 암호화
const saltRounds = 10; // salt를 몇 글자로 할지
const jwt = require("jsonwebtoken"); // 토큰 생성

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 스페이스를 없애주는 역할
    unique: 1, // 중복을 허용하지 않음
  },
  password: {
    type: String,
    minlength: 4,
  },
  lastnmae: {
    type: String,
    maxlength: 50,
  },
  role: {
    // 관리자와 일반 유저를 구분하기 위한 역할
    type: Number,
    default: 0, // 0은 일반 유저, 1은 관리자
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 몽구스에서 가져온 메서드
userSchema.pre("save", function (next) {
  // save하기 전에 비밀번호를 암호화 시킨다
  const user = this;
  if (user.isModified("password")) {
    // 비밀번호를 바꿀 때만 암호화 시킨다.
    // salt를 이용해서 비밀번호 암호화한다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      // hash(plain 비밀번호, salt, 암호화된 비밀번호 함수)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // 암호화된 비밀번호 생성하면 교체
        next();
      });
    });
  } else {
    // 비밀번호를 바꾸지 않을 땐 암호화 넘어가기
    next();
  }
});

// 비밀번호를 비교하는 메소드
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

userSchema.methods.generateToken = async function () {
  try {
    const user = this;
    // 토큰 생성
    const token = jwt.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    await user.save();

    return token;
  } catch (err) {
    throw err;
  }
};

// 토큰을 복호화하는 메소드
// userSchema.statics.findByToken = function (token, cb) {
//   const user = this;
//   // 토큰을 decode 한다.
//   jwt.verify(token, "secretToken", function (err, decoded) {
//     // 유저 아이디를 이용해서 유저를 찾은 다음에
//     // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
//     user.findOne({ _id: decoded, token: token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

userSchema.statics.findByToken = async function(token) {
  const user = this;
  
  try {
      // 토큰을 decode 한다
      const decoded = await jwt.verify(token, "secretToken");
      
      // 유저 아이디를 이용해 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
      const foundUser = await user.findOne({ _id: decoded, token: token });
      
      return foundUser;
  } catch (err) {
      throw err;
  }
};


const User = mongoose.model("User", userSchema); // 스키마를 모델로 감싸준다

module.exports = { User }; // 다른 곳에서도 사용할 수 있도록 export
