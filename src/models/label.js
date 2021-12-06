"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Label.belongsToMany(models.Post, {
        through: "LabelPosts",
        foreignKey: "labelId",
      });
    }
  }
  Label.init(
    {
      labelName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Label",
    }
  );
  return Label;
};
