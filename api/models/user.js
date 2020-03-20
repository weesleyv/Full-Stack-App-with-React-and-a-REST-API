"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last name is required"
          }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Must be valid email address format"
          },
          notEmpty: {
            msg: "Email is required"
          },
          async isUnique(email) {
            try {
              const user = await User.findOne({
                where: {
                  emailAddress: email
                }
              });
              if (user) {
                throw new Error("email already registered");
              }
            } catch (error) {
              throw error;
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        afterValidate: function(user) {
          user.password = bcrypt.hashSync(user.password, 8);
        }
      }
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Course, { foreignKey: "userId" });
  };
  return User;
};
