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
    return res.status(400).json({ error: "Informe o título do jogo" });
  }
  try {
    const games = await searchGames(title);
    res.json(games);
  } catch (error) {
    console.error(error);
    return res
      .status(502)
      .json({ error: "Não foi possível buscar o jogo agora" });
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
