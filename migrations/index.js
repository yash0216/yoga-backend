const Sequelize = require("sequelize");
const UserModel = require("./User");
const TransactionModel = require("./Transaction");
const SlotModel = require("./Slot");

const urlComponents = new URL(process.env.DATABASE_URL);

const sequelize = new Sequelize({
    dialect: "postgres",
    host: urlComponents.hostname,
    port: urlComponents.port,
    username: urlComponents.username,
    password: urlComponents.password,
    database: urlComponents.pathname.substring(1),
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

const User = UserModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
const Slot = SlotModel(sequelize, Sequelize);

User.hasMany(Transaction, { foreignKey: "userID" });
Transaction.belongsTo(User, { foreignKey: "userID" });

module.exports = { sequelize, User, Transaction, Slot };
