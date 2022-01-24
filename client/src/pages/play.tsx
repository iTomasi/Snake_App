import React from "react";

// Components
import SnakeGame from "components/game/SnakeGame";

const Play = () => {
    return (
        <div>
            <SnakeGame/>
        </div>
    )
}

Play.ProtectRoute = true;

export default Play;