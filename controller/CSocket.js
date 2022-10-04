const { Room, Participation } = require("../model");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

// 채팅 페이지
exports.roomlist = (req, res) => {
  res.render("socket/roomList");
};
// 채팅 내용 찾기
exports.myroomlist = (req, res) => {
  Room.findAll({
    raw: true,
    include: [
      {
        model: Participation,
        where: {
          user_id: req.body.user_id,
        },
      },
    ],
    order: sequelize.literal("lastdate DESC"),
  }).then((result) => {
    const data = result;
    res.send(data);
  });
};

exports.socket = (req, res) => {
  res.render("socket/socket", { room_id: req.params.id });
};

// 채팅 방 만들기
exports.socket_create = (req, res) => {
  const data = {
    title: req.body.title,
    img: req.body.img,
    content: "",
    lastdate: new Date(),
  };
  Room.create(data).then((result) => {
    Participation.create({
      user_id: req.body.user_id,
      room_id: result.id,
      target: req.body.other_id,
    }).then((result) => {});
    Participation.create({
      user_id: req.body.other_id,
      room_id: result.id,
      target: req.body.user_id,
    }).then((result) => {});
    res.send({ id: result.id });
  });
};

// 채팅 방 확인
exports.socket_check = (req, res) => {
  // sequelize.query(sql, { type: ~~.SELECT})
  Participation.findOne({
    attributes: ["room_id", [sequelize.fn("count", "*"), "count"]],
    where: {
      [Op.or]: [{ user_id: req.body.other_id }, { user_id: req.body.user_id }],
    },
    group: ["room_id"],
    // order: sequelize.literal("count DESC"),
    having: sequelize.where(sequelize.col("count"), {
      [Op.gte]: 2,
    }),
  }).then((result) => {
    const data = result;
    if (data) res.send(data);
    else res.send(data);
  });
};

// 채팅 내용 찾기
exports.socket_content = (req, res) => {
  Room.findOne({
    raw: true,
    include: [
      {
        model: Participation,
        where: {
          user_id: req.body.user_id,
        },
      },
    ],
    where: {
      id: req.body.room_id,
    },
  }).then((result) => {
    const data = result;
    res.send(data);
  });
};

exports.content_updata = (req, res) => {
  Room.update(
    { content: req.body.content, lastDate: new Date() },
    {
      where: {
        id: req.body.room_id,
      },
    }
  ).then((result) => {
    const data = result;
    res.send(data);
  });
};
