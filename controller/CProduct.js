const { User, Product, Category, ProductLikeUsers } = require("../model");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const categories = {
  life: "생활/가전",
  electro: "전자제품",
  fashion: "패션/의류",
  interior: "가구/인테리어",
  book: "도서/음반/티켓",
  food: "식품/잡화",
  pet: "반려동물",
};

exports.product = (req, res) => {
  Product.findOne({
    include: [{ model: User }],
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    const data = result;
    data.img = data.img.split("..");
    data.category = categories[data.category_id];
    data.category_id = data.category_id;
    res.render("product/product", { data });
  });
};

exports.product_like = (req, res) => {
  ProductLikeUsers.findOne({
    where: {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
    },
  }).then((result) => {
    res.send(result);
  });
};

exports.product_list = (req, res) => {
  const id = req.body.id;

  if (id) {
    Product.findAll({
      include: [
        {
          model: ProductLikeUsers,
          required: false,
          where: {
            user_id: id,
          },
        },
      ],
      order: [["id", "DESC"]],
    }).then((result) => {
      res.send(result);
    });
  } else {
    Product.findAll({
      include: [ProductLikeUsers],
      order: [["id", "DESC"]],
    }).then((result) => {
      res.send(result);
    });
  }
};

exports.product_popular = (req, res) => {
  const user_id = req.body.user_id;

  Product.findAll({
    include: [
      {
        model: ProductLikeUsers,
        attributes: [
          "product_id",
          "user_id",
          [sequelize.fn("count", "*"), "count"],
        ],
        required: false,
      },
    ],
    group: ["product_id"],
  }).then((result) => {
    res.send(result);
  });
};

exports.categories = (req, res) => {
  res.render("product/categories", { category: req.params.id });
};

exports.categories_list = (req, res) => {
  const user_id = req.body.user_id;

  if (user_id) {
    Product.findAll({
      include: [
        {
          model: ProductLikeUsers,
          required: false,
          where: {
            user_id: user_id,
          },
        },
      ],
      where: {
        category_id: req.params.id,
      },
    }).then((result) => {
      res.send(result);
    });
  } else {
    Product.findAll({
      where: {
        category_id: req.params.id,
      },
    }).then((result) => {
      res.send(result);
    });
  }
};

// 상품 생성
exports.product_create = (req, res) => {
  let img_name = "";
  for (let i = 0; i < req.files.length; i++) {
    if (i != 0) img_name += "..";
    img_name += "/uploads/" + req.files[i].filename;
  }
  const data = {
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    title: req.body.title,
    img: img_name,
    adult: req.body.adult,
    price: req.body.price,
    position: req.body.position,
    content: req.body.content,
  };

  Product.create(data).then((result) => {
    res.send(result);
    console.log(result);
  });
};

// 나의 등록 상품
exports.product_myproduct = (req, res) => {
  Product.findAll({
    where: { user_id: req.body.id },
    order: [["id", "DESC"]],
  }).then((result) => {
    res.send(result);
  });
};

// 나의 등록 상품
exports.product_update = (req, res) => {
  let img_name = "";
  for (let i = 0; i < req.files.length; i++) {
    if (i != 0) img_name += "..";
    img_name += "/uploads/" + req.files[i].filename;
  }
  const data = {
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    title: req.body.title,
    img: img_name,
    adult: req.body.adult,
    price: req.body.price.replace("원", ""),
    position: req.body.position,
    content: req.body.content,
  };

  Product.update(data, {
    where: { id: req.body.id },
  }).then((result) => {
    const img = "/uploads/" + req.files[0].filename;
    res.send(img);
  });
};

// 나의 등록 상품
exports.product_delete = (req, res) => {
  Product.destroy({
    where: { id: req.body.id },
  }).then(() => {
    res.send("true");
  });
};

// 나의 등록 상품
exports.product_search = (req, res) => {
  res.render("product/search", { search_item: req.params.product });
};

// 나의 등록 상품
exports.search_item = (req, res) => {
  const user_id = req.body.user_id;
  if (user_id) {
    Product.findAll({
      include: [
        {
          model: ProductLikeUsers,
          required: false,
          where: {
            user_id: user_id,
          },
        },
      ],
      where: {
        title: {
          [Op.like]: "%" + req.body.search_item + "%",
        },
      },
    }).then((result) => {
      const data = result;
      res.send(data);
    });
  } else {
    Product.findAll({
      where: {
        title: {
          [Op.like]: "%" + req.body.search_item + "%",
        },
      },
    }).then((result) => {
      const data = result;
      res.send(data);
    });
  }
};

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

exports.categories_items = (req, res) => {
  console.log(req.body.product_id);
  Product.findAll({
    where: {
      category_id: req.body.category_id,
      [Op.not]: [{ id: req.body.product_id }],
    },
  }).then((result) => {
    const data = result;
    shuffleArray(data);
    res.send(data);
  });
};

exports.like_item = (req, res) => {
  const data = {
    user_id: req.body.user_id,
    product_id: req.body.product_id,
  };
  ProductLikeUsers.create(data).then((result) => {
    const data = result;
    res.send(data);
  });
};

exports.like_delete_item = (req, res) => {
  ProductLikeUsers.destroy({
    where: { user_id: req.body.user_id, product_id: req.body.product_id },
  }).then((result) => {
    console.log(result);
    res.send(true);
  });
};

// 찜한 목록
exports.like_items = (req, res) => {
  ProductLikeUsers.findAll({
    include: [Product],
    where: {
      user_id: req.body.user_id,
    },
  }).then((result) => {
    const data = result;
    res.send(data);
  });
};
