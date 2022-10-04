const express = require("express");
const socket = require("../controller/CSocket");
const uesr = require("../controller/CUser");
const product = require("../controller/CProduct");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const time = new Date();
      done(
        null,
        time.getFullYear() +
          "_" +
          (time.getMonth() + 1) +
          "_" +
          time.getDate() +
          "_" +
          time.getHours() +
          "_" +
          time.getMinutes() +
          "_" +
          time.getSeconds() +
          "_" +
          time.getMilliseconds() +
          ext
      );
      // done(null, file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
const router = express.Router();

// 로그인 페이지
router.post("/login", uesr.login_check);
// 유저 생성
router.post("/signup", uesr.signup_create);
router.post("/signup/idcheck", uesr.signup_id_check);

router.put("/user/update", uesr.user_update);
router.delete("/user/delete", uesr.user_delete);
router.post("/logout", uesr.user_logout);

// 상품 생성
router.post("/product", upload.array("img"), product.product_create);
router.post("/products", product.product_list);
router.post("/products/popular", product.product_popular);
router.post("/product/myproduct", product.product_myproduct);
router.post("/product/like", product.product_like);
router.put("/product/update", upload.array("img"), product.product_update);
router.delete("/product/delete", product.product_delete);

router.post("/search/:product", product.search_item);
// like
router.post("/like", product.like_item);
router.post("/likes", product.like_items);
router.delete("/like_delete", product.like_delete_item);

// 카테고리 상품
router.post("/categories/:id", product.categories_list);
router.post("/product/categories", product.categories_items);

// 소캣 룸 생성
router.post("/room", socket.socket_create);
router.post("/roomlist", socket.myroomlist);
router.post("/roomcheck", socket.socket_check);

router.post("/content", socket.socket_content);
router.post("/content/update", socket.content_updata);

module.exports = router;
