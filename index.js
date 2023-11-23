import "./env.js";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";
import sequelize from "./db.js";
import router from "./src/routes/index.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working!" });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Сервер запущен на порте ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
