const { User } = require("../model");

exports.main = (req, res) => {
  res.render("index");
};
// 네이버 로그인 콜백 페이지
exports.naverCallback = (req, res) => {
  res.render("./login/naver_callback");
};
// 카카오 로그인 콜백 페이지
exports.kakaoCallback = (req, res) => {
  var data = {
    email: req.body.email,
    name: req.body.name,
  };
  User.findOne({
    where: { id: data.email },
  }).then((result) => {
    if (result) {
      res.redirect("/");
    } else {
      res.render("./login/kakao_callback", {
        email: req.body.email,
        name: req.body.name,
      });
    }
  });
};

exports.mypage = (req, res) => {
  const data = [];
  let result = true;
  res.render("./mypage/mypageItem", { data: result });
};

exports.mypick = (req, res) => {
  const data = [];
  let result = true;
  res.render("./mypage/mypagePick", { data: result });
};

exports.myfix = (req, res) => {
  res.render("./mypage/mypageFix");
};

exports.infofix = (req, res) => {
  res.render("./mypage/mypageGoFix");
};
