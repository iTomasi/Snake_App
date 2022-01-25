import generateSnakeFood from "./generateSnakeFood";

interface ISnakePositions {
    x: number;
    y: number;
    direction?: number;
}

let snakePositions: ISnakePositions[] = [ {x: 10, y: 10, direction: 1} ];
const snakeFood: ISnakePositions = { x: 0, y: 0 };
const snakeMovingPosition: number = 10;
let snakeBoxSize: number = 10;

const customEvent = (eventName: string, data?: object) => {
    return new CustomEvent(
        eventName,
        {
            detail: !data ? {} : data
        }
    )
}

const onListenerEvent = (target: HTMLElement) => {
    return (eventName: "foodeaten" | "gameover", cb: (data: any) => void) => {
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

    let firstDirection: number = 0;

    snakePositions.forEach((value, index) => {
        if (value.direction === 0) {
            if (value.y <= 0) value.y = $canvas.height
            else value.y -= snakeMovingPosition
        }

        else if (value.direction === 1) {
            if (value.x >= $canvas.width) value.x = 0
            else value.x += snakeMovingPosition
        }

        else if (value.direction === 2) {
            if (value.y >= $canvas.height) value.y = 0
            else value.y += snakeMovingPosition
        }

        else if (value.direction === 3) {
            if (value.x <= 0) value.x = $canvas.width
            else value.x -= snakeMovingPosition
        }

        if (index === 0) {
            firstDirection = value.direction
        }

        else {
            const secondDirection = value.direction;
            value.direction = firstDirection;
            firstDirection = secondDirection;
        }

        ctx.fillStyle = "#4f58b9";
        ctx.fillRect(value.x, value.y, 10, 10);
    })

    const firstSnakeElement = snakePositions[0];

    const some = snakePositions.some((value, index) => {
        if (index === 0) return false

        return value.x === firstSnakeElement.x && value.y === firstSnakeElement.y
    })

    if (some) {
        $canvas.dispatchEvent(customEvent("gameover"))
        snakePositions = [ { x: 10, y: 10, direction: 1 } ]

        const randomFood = generateSnakeFood($canvas.width, $canvas.height, snakePositions, snakeBoxSize);
        snakeFood.x = randomFood.x;
        snakeFood.y = randomFood.y;
        return
    }

    if (firstSnakeElement.x === snakeFood.x && firstSnakeElement.y === snakeFood.y) {
        const lastSnakeElement = snakePositions[snakePositions.length - 1]
        const lastSnakeDirection = lastSnakeElement.direction;

        let x: number = 0;
        let y: number = 0;

        if (lastSnakeDirection === 0) {
            x = lastSnakeElement.x;
            y = lastSnakeElement.y + snakeBoxSize;
        }

        else if (lastSnakeDirection === 1) {
            x = lastSnakeElement.x - snakeBoxSize;
            y = lastSnakeElement.y;
        }

        else if (lastSnakeDirection === 2) {
            x = lastSnakeElement.x;
            y = lastSnakeElement.y - snakeBoxSize;
        }

        else if (lastSnakeDirection === 3) {
            x = lastSnakeElement.x + snakeBoxSize;
            y = lastSnakeElement.y
        }

        const generateRandomFood = generateSnakeFood($canvas.width, $canvas.height, snakePositions, snakeBoxSize)

        snakeFood.x = generateRandomFood.x;
        snakeFood.y = generateRandomFood.y;

        snakePositions.push({
            x,
            y,
            direction: lastSnakeDirection
        })

        $canvas.dispatchEvent(customEvent("foodeaten"))
    }

}

const handleSnakeGame = ($canvas: HTMLCanvasElement) => {
    window.addEventListener("keydown", (e) => {
        const key = e.key;

        if (key === "ArrowUp") {
            if (
                snakePositions.length === 1 ||
                snakePositions[1].y !== snakePositions[0].y - snakeBoxSize
            ) {
                snakePositions[0].direction = 0;
            }
        }

        else if (key === "ArrowRight") {
            if (
                snakePositions.length === 1 ||
                snakePositions[1].x !== snakePositions[0].x + snakeBoxSize
            ) {
                snakePositions[0].direction = 1
                return
            }
        }

        else if (key === "ArrowDown") {
            if (snakePositions.length === 1 || snakePositions[1].y !== snakePositions[0].y + snakeBoxSize) {
                snakePositions[0].direction = 2;
                return
            }
        }

        else if (key === "ArrowLeft") {
            if (snakePositions.length === 1 || snakePositions[1].x !== snakePositions[0].x - snakeBoxSize) {
                snakePositions[0].direction = 3
                return
            }

        }
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