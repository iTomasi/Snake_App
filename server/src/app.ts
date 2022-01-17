import express from "express";
import cors from "cors";
import { createServer } from "http";

// Routes
import indexRoutes from "./routes/index.routes";

const app = express();
const server = createServer(app);

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

export { app, server }