import React, { useRef, useEffect, useState } from "react";

// Helpers
import handleSnakeGame from "helpers/game/handleSnakeGame";

// Hooks
import { useSocket } from "hooks/useSocket";

const SnakeGame = () => {
    const socket = useSocket();
    const canvasRef = useRef<HTMLCanvasElement>();
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (!socket) return
        console.log(socket)

        const $canvas = canvasRef.current;

        const snake = handleSnakeGame($canvas);

        snake.start(40)

        snake.on("foodeaten", () => {
            socket.emit("food_eaten", "+1")
            setScore((prev) => prev + 1)
        })

        snake.on("gameover", () => {
            socket.emit("game_over", "gg!");
            setScore(0)
        })

        return () => snake.stop()
    }, [socket])

    return (
        <div>

            <h4 className="iw-text-center iw-mb-4 iw-text-2xl">Score: <span>{score}</span></h4>

            <div className="iw-w-[500px] iw-h-[500px] iw-mx-auto">
                <canvas className="iw-bg-stone-800 iw-w-full iw-h-full" height={500} width={500} ref={canvasRef}></canvas>
            </div>

            
        </div>
    )
};

export default SnakeGame;