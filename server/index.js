import express from "express";
import cors from "cors";
import userRoutes from "./routes/usersRoute.js";
import rolesRoutes from "./routes/rolesRoute.js";
import { db } from "./db.js";
import registerController from "./controllers/registerController.js";
import loginController from "./controllers/loginController.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes, rolesRoutes);

app.post("/register", registerController.register);
app.post("/login", loginController.login);

// verificar conexão com MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("MySQL connection successful!");
});

// fecha a conexão quando o aplicativo é encerrado
process.on("SIGINT", () => {
  db.end();
});

// mensagem do servidor rodando e da porta utilizada
const port = 8800;
app.listen(port, () => console.log(`Server running at port ${port}...`));
