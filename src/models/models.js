import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

export const Message = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  activationMessage: { type: DataTypes.STRING, allowNull: false },
});

export const Car = sequelize.define("car", {
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

export const Favourites = sequelize.define("favourites", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const FavouritedCar = sequelize.define("favourited_car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

export const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

export const Request = sequelize.define("requests", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
});

export const BuyRequest = sequelize.define("buy_requests", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  carId: { type: DataTypes.INTEGER, allowNull: false },
});

export const TypeBrand = sequelize.define("type_brand", {
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
