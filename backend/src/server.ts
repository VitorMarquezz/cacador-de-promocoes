import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import { searchGames } from "./services/cheapshark";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/db-check", async (req, res) => {
  const countUser = await prisma.user.count();
  res.json({ usuarios: countUser });
});

app.get("/games/search", async (req, res) => {
  const { title } = req.query;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "informe o título do jogo" });
  }
  const games = await searchGames(title);
  res.json(games);
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
