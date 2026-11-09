import express from "express"
import cors from "cors"
import {prisma} from "./lib/prisma"

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({status: "ok"})
})

app.get("/db-check", async (req, res) => {
    const countUser = await prisma.user.count()
    res.json({ "usuarios": countUser})
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`)
})