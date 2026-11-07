// TODO 1: importar express e cors
import express from "express";
import cors from "cors";
// TODO 2: criar o app
const app = express();
// TODO 3: ativar o cors e o express.json()
app.use(cors)
app.use(express.json)
// TODO 4: rota GET "/" que responde { status: "ok" }
app.get("/", (req, res) => {
    res.json({"status": "ok"})
})
// TODO 5: porta e app.listen
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`)
})