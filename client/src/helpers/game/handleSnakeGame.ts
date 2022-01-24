import generateSnakeFood from "./generateSnakeFood";

interface ISnakePositions {
    x: number;
    y: number;
}

const snakePositions: ISnakePositions[] = [ {x: 10, y: 10} ];
const snakeFood: ISnakePositions = { x: 0, y: 0 };
const snakeMovingPosition: number = 5;
let snakeDirection: number = 1;
let snakeBoxSize: number = 10;

const customEvent = (eventName: string, data: object) => {
    return new CustomEvent(
        eventName,
        {
            detail: data
        }
    )
}

const onListenerEvent = (target: HTMLElement) => {
    return (eventName: "test", cb: (data: any) => void) => {
        target.addEventListener(eventName, (e: any) => {
            cb(e.detail);
        })
    }
}

const updateGame = ($canvas: HTMLCanvasElement) => {
    const ctx = $canvas.getContext("2d");
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    ctx.fillStyle = "#0088ff";
    ctx.fillRect(snakeFood.x, snakeFood.y, snakeBoxSize, snakeBoxSize);

    snakePositions.forEach((value) => {
        if (snakeDirection === 0) {
            if (value.y <= 0) value.y = $canvas.height
            else value.y -= snakeMovingPosition
        }

        else if (snakeDirection === 1) {
            if (value.x >= $canvas.width) value.x = 0
            else value.x += snakeMovingPosition
        }

        else if (snakeDirection === 2) {
            if (value.y >= $canvas.height) value.y = 0
            else value.y += snakeMovingPosition
        }

        else if (snakeDirection === 3) {
            if (value.x <= 0) value.x = $canvas.width
            else value.x -= snakeMovingPosition
        }

        ctx.fillStyle = "#4f58b9";
        ctx.fillRect(value.x, value.y, 10, 10);
    })

}

const handleSnakeGame = ($canvas: HTMLCanvasElement) => {
    window.addEventListener("keydown", (e) => {
        const key = e.key;

        if (key === "ArrowUp") snakeDirection = 0
        else if (key === "ArrowRight") snakeDirection = 1
        else if (key === "ArrowDown") snakeDirection = 2
        else if (key === "ArrowLeft") snakeDirection = 3
    })

    const theFood = generateSnakeFood($canvas.width, $canvas.height, snakePositions, snakeMovingPosition);

    snakeFood.x = theFood.x
    snakeFood.y = theFood.y;

    setInterval(() => {
        updateGame($canvas);
    }, 30)

    return {
        on: onListenerEvent($canvas)
    }
}

export default handleSnakeGame;