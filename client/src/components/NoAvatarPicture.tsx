import React from "react";

interface INoAvatarPicture {
    className?: string;
    text: string;
}

const NoAvatarPicture = ({ className = "", text }: INoAvatarPicture) => {
    let sizeClassName: string = "iw-w-10 iw-h-10";

    if (className.includes("iw-h") && className.includes("iw-w")) {
        sizeClassName = ""
    }

    return (
        <div className={`iw-bg-stone-900 iw-rounded-full iw-flex iw-justify-center iw-items-center iw-select-none ${sizeClassName} ${className}`}>
            {
                !text
                ? "N"
                : text[0].toUpperCase()
            }
        </div>
    )
}

export default NoAvatarPicture;