const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];
// const config = require("../config/config.json")["product"];
// const config = require("../config/config.json")["server"];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Category = require("./Category")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);
db.ProductLikeUsers = require("./ProductLikeUser")(sequelize, Sequelize);
db.Review = require("./Review")(sequelize, Sequelize);

db.Product.belongsTo(db.User, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.User.hasMany(db.Product, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.Product.belongsTo(db.Category, {
  foreignKey: "category_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});
db.Category.hasMany(db.Product, {
  foreignKey: "category_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.ProductLikeUsers.belongsTo(db.User, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.User.hasMany(db.ProductLikeUsers, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.ProductLikeUsers.belongsTo(db.Product, {
  foreignKey: "product_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.Product.hasMany(db.ProductLikeUsers, {
  foreignKey: "product_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.Review.belongsTo(db.Product, {
  foreignKey: "product_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.Product.hasMany(db.Review, {
  foreignKey: "product_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});
db.Review.belongsTo(db.User, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.User.hasMany(db.Review, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.Room = require("./Room")(sequelize, Sequelize);
db.Participation = require("./Participation")(sequelize, Sequelize);

db.Participation.belongsTo(db.Room, {
  foreignKey: "room_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});
db.Room.hasMany(db.Participation, {
  foreignKey: "room_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.Participation.belongsTo(db.User, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

db.User.hasMany(db.Participation, {
  foreignKey: "user_id",
  sourceKey: "id",
  onUpdate: "cascade",
  onDelete: "cascade",
});

module.exports = db;
