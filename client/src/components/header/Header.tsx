import React from "react";

// Components
import Left from "./Left";
import Right from "./Right";

const Header = () => {
    return (
        <header className="iw-bg-stone-800 iw-h-16 iw-flex iw-justify-between iw-items-center iw-px-8">
            <Left/>
            <Right/>
        </header>
    )
};

export default Header;