// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 18,
        max: 65,
      },
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["6-7AM", "7-8AM", "8-9AM", "5-6PM"]], // Adjust as needed
      },
    },
  });

  return User;
};
