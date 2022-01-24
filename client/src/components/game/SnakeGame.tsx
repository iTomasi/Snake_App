import React, { useRef, useEffect } from "react";

// Helpers
import handleSnakeGame from "helpers/game/handleSnakeGame";

const SnakeGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const $canvas = canvasRef.current;

        const snake = handleSnakeGame($canvas);

        snake.on("test", data => {
            console.log(data)
        })
    }, [])

    return (
        <div>

            <h4 className="iw-text-center iw-mb-4 iw-text-2xl">Score: <span>5</span></h4>

            <div className="iw-w-[500px] iw-h-[500px] iw-mx-auto">
                <canvas className="iw-bg-stone-800 iw-w-full iw-h-full" height={500} width={500} ref={canvasRef}></canvas>
            </div>

            
        </div>
    )
};

export default SnakeGame;