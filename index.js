require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api", userRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
