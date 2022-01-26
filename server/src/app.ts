import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Routes
import indexRoutes from "./routes/index.routes";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: ["http://localhost:3000"] } })

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.json({
        message: "API ON"
    })
});

app.use("/api", indexRoutes);

io.on("connection", (socket) => {
    console.log(socket.id);
    console.log({userId: socket.handshake.query})
    console.log("new user connected")
})

export { app, server }