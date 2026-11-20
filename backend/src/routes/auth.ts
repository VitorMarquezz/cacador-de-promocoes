import { Router } from "express";

export const authRouter = Router();

authRouter.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Nome é obrigatório" });
  }

  if (
    typeof email !== "string" ||
    email.trim() === "" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "A senha deve conter pelo menos 8 caracteres" });
  }

  res.json({ name, email });
});
