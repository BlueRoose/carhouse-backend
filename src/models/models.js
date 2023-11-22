const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Car = sequelize.define("car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  transmission: { type: DataTypes.STRING, allowNull: false },
  passenger: { type: DataTypes.INTEGER, allowNull: false },
  topSpeed: { type: DataTypes.INTEGER, allowNull: false },
  horsePower: { type: DataTypes.INTEGER, allowNull: false },
  time: { type: DataTypes.DOUBLE, allowNull: false },
  rating: { type: DataTypes.DOUBLE, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Favourites = sequelize.define("favourites", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const FavouritedCar = sequelize.define("favourited_car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Request = sequelize.define("requests", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
});

const BuyRequest = sequelize.define("buy_requests", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  carId: { type: DataTypes.INTEGER, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Type.hasMany(Car);
Car.belongsTo(Type);

Brand.hasMany(Car);
Car.belongsTo(Brand);

User.hasMany(BuyRequest);
BuyRequest.belongsTo(User);

User.hasOne(Favourites);
Favourites.belongsTo(User);

Favourites.hasMany(FavouritedCar);
FavouritedCar.belongsTo(Favourites);

FavouritedCar.hasOne(Car);
Car.belongsTo(FavouritedCar);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Car,
  Favourites,
  FavouritedCar,
  Brand,
  Type,
  Request,
  BuyRequest,
  TypeBrand,
};