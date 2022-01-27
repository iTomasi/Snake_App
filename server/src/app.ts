import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { usersOnline } from "./usersOnline";
import Account from "./models/postgres/Account";

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
    const userId = socket.handshake.query.userId?.toString();

    console.log(userId)

    if (!userId) return

    const findIndex = usersOnline.findIndex((value) => value.id === userId);

    if (findIndex === -1) {
        usersOnline.push({
            id: userId,
            scores: {
                [socket.id]: 0
            }
        })
    }

    else {
        usersOnline[findIndex].scores[socket.id] = 0
    }
    
    socket.on("food_eaten", (data) => {
        const findIndex_0 = usersOnline.findIndex((value) => value.id === userId);

        if (findIndex_0 === -1) {
            console.log("wtf?");
            return
        }

        if (data === "+1") {
            console.log("food +1");
            usersOnline[findIndex_0].scores[socket.id] += 1
        }
    })

    socket.on("game_over", async (data) => {
        const findIndex_0 = usersOnline.findIndex((value) => value.id === userId);

        if (findIndex_0 === -1) {
            console.log("Wtf x3?");
            return
        }

        if (data === "gg!") {
            try {
                const user = await Account.findOne({
                    where: {
                        id: userId
                    }
                });

                if (!user) {
                    console.log("socket: user not found");
                    return
                }

                const currentScore = usersOnline[findIndex_0].scores[socket.id];

                const maxScores: any = user.getDataValue("maxScores");

                if (currentScore > maxScores.snake) {
                    maxScores.snake = currentScore;
                    usersOnline[findIndex_0].scores[socket.id] = 0;

                    await Account.update({
                        maxScores
                    }, {
                        where: {
                            id: userId
                        }
                    })
                    
                    console.log("save")
                }
            }

            catch(e) {
                console.log(e);
                console.log("socket: postgres error");
            }
        }


    })

    socket.on("disconnect", () => {
        console.log(socket.id + " " + "Disconnected")
        const findIndex_0 = usersOnline.findIndex((value) => value.id === userId);

        if (findIndex_0 === -1) {
            console.log("wtf x2?");
            return
        }

        const objectKeys = Object.keys(usersOnline[findIndex_0].scores);

        if (objectKeys.length > 1) {
            delete usersOnline[findIndex_0].scores[socket.id];
            return
        }

        usersOnline.splice(findIndex_0, 1)
    })
})

export { app, server }