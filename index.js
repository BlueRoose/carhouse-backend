require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

// Error handling
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working!" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
