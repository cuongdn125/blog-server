"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "userId" });
    }
    // validPassword(password) {
    //   return bcrypt.compareSync(password, this.password);
    // }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      status: DataTypes.ENUM("active", "inactive"),
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user, options) => {
    // console.log(user.dataValues);
    const salt = await bcrypt.genSalt(10);
    // console.log(user.dataValues.password);
    user.dataValues.password = await bcrypt.hash(
      user.dataValues.password,
      salt
    );
    // console.log(user.dataValues.password);
  });

  // User.validPassword = async function (password) {
  //   try {
  //     return await bcrypt.compare(password, this.password);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  return User;
};
