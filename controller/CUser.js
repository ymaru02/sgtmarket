const { User } = require("../model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// 로그인 페이지
exports.login = (req, res) => {
  res.render("./login/login");
};
// 로그인 검사
exports.login_check = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
      pw: req.body.pw,
    },
  }).then((result) => {
    if (result) {
      jwt.sign(
        {
          id: req.body.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) {
            console.log(err);
            res
              .status(401)
              .json({ success: false, errormessage: "token sign fail" });
          } else {
            res.cookie("jwt", token);
            res.json({ success: true, accessToken: token, id: req.body.id });
          }
        }
      );
    } else {
      res.json({
        success: false,
        errormessage: "아이디 또는 비밀번호를 입력해주세요.",
      });
    }
  });
};
// 네이버 로그인 콜백 페이지
exports.callback = (req, res) => {
  res.render("naver_callback");
};
// 회원가입 페이지
exports.signup = (req, res) => {
  res.render("./signup/signup");
};

// 회원가입 아이디 중복 검사
exports.signup_id_check = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
    },
  }).then((result) => {
    if (result) res.send(result);
    else res.send(false);
  });
};

// 유저 생성
exports.signup_create = (req, res) => {
  const data = {
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
    image: "/static/img/profileimg.jpg",
  };
  User.create(data).then((result) => {
    res.send(true);
  });
};

// 회원가입 수정
exports.user_update = (req, res) => {
  const data = {
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
  };
  User.update(data, { where: { id: req.body.id } }).then((result) => {
    res.send(true);
  });
};

// 회원탈퇴
exports.user_delete = (req, res) => {
  User.destroy({
    where: { id: req.body.id },
  }).then(() => {
    res.send(true);
  });
};

exports.user_logout = (req, res) => {
  res.clearCookie("jwt");
  res.send("true");
};
