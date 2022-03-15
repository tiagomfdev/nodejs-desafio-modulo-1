import express from "express";
import requestRepository from "./repositories/request.repository.js";
import RequestRouter from "./routes/request.routes.js";

const app = express();
app.use(express.json());

app.use("/pedido", RequestRouter);

app.listen(3000, async () => {
  try {
    console.log("API Started!");
  } catch (error) {
    console.log(error.message);
  }
});
