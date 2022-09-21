const { User } = require("../model");
const { Product } = require("../model");
const { ProductLikeUsers } = require("../model");

exports.main = (req, res) => {
  res.render("index");
};

// 로그인 페이지
exports.login = (req, res) => {
  res.render("login");
};

// 로그인 검사
exports.login_check = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id,
      pw: req.body.pw,
    },
  }).then((result) => {
    if (result) res.send(true);
    else res.send(false);
  });
};

// 네이버 로그인 콜백 페이지
exports.callback = (req, res) => {
  res.render("naver_callback");
};

// 회원가입 페이지
exports.signup = (req, res) => {
  res.render("signup");
};

// 유저 생성
exports.signup_create = (req, res) => {
  const data = {
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
    email: req.body.email,
    position: req.body.position,
  };
  User.create(data).then((result) => {
    res.send(true);
  });
};
