import express from "express";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.js";
import rolesRoutes from "./routes/rolesRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes, rolesRoutes, loginRoutes);

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
