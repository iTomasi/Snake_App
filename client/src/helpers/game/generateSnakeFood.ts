interface ISnakePositions {
    x: number;
    y: number;
}

const generateSnakeFood = (canvasWidth: number, canvasHeight: number, snakePositions: ISnakePositions[], modulusNumber: number) => {
    let x = Math.floor(Math.random() * canvasWidth);
    let y = Math.floor(Math.random() * canvasHeight);

    if (x % modulusNumber !== 0) {
        x -= x % modulusNumber;
    }

    if (y % modulusNumber !== 0) {
        y -= y % modulusNumber;
    }

    const some = snakePositions.some((value) => value.x === x && value.y === y);

    if (some) {
        return generateSnakeFood(canvasWidth, canvasHeight, snakePositions, modulusNumber)
    }

    return { x, y }
};

export default generateSnakeFood;