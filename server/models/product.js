'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name can't be null"
        },
        notEmpty: {
          msg: "Name can't be empty"
        }
      }
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price can't be null"
        },
        notEmpty: {
          msg: "Price can't be empty"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock can't be null"
        },
        notEmpty: {
          msg: "Stock can't be empty"
        }
      }
    },
    image: DataTypes.STRING,
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category can't be null"
        },
        notEmpty: {
          msg: "Category can't be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User can't be null"
        },
        notEmpty: {
          msg: "User can't be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};