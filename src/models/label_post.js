"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LabelPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association her
      LabelPost.belongsToMany(models.Label, {
        through: "LabelPosts",
        foreignKey: "labelId",
      });
      LabelPost.belongsToMany(models.Post, {
        through: "LabelPosts",
        foreignKey: "postId",
      });
    }
  }
  LabelPost.init(
    {
      labelId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LabelPost",
    }
  );
  return LabelPost;
};
