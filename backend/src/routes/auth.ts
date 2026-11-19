import { Router } from "express";

export const authRouter = Router();

authRouter.post("/register", (req, res) => {
  res.json({ mensagem: "Cadastro em construção" });
});
