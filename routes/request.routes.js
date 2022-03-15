import express from "express";
import RequestController from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", RequestController.createRequest);
router.put("/atualizar", RequestController.updateRequest);
router.patch("/atualizarStatus", RequestController.updateRequestStatus);
router.delete("/:id", RequestController.deleteRequest);
router.get("/clienteTotal", RequestController.getTotalSpendPerClient);
router.get("/produtoTotal", RequestController.getTotalSalesPerProductDelivered);
router.get("/produtosMaisVendidos", RequestController.getProductsMostDelivered);

router.get("/:id", RequestController.getRequest);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
