import React from "react";

// Next
import Link from "next/link";

interface IButtonProps {
    className?: string;
    type?: "submit" | "button" | "link";
    text: string;
    href?: string;
}

const buttonClassName: string = "iw-block iw-px-4 iw-py-2 iw-rounded iw-text-center"

const Button = ({ className = "", type = "submit", text, href = "#" }: IButtonProps) => {
    if (type !== "link" && href !== "#") throw new Error(`<Button type="${type}"/> can't use href props if your button is type: ${type}`)

    if (type === "link") {
        return (
            <Link href={href}>
                <a className={`${buttonClassName} ${className}`}>
                    {text}
                </a>
            </Link>
        )
    }

    return (
        <button
            className={`${buttonClassName} ${className}`}
            type={type}

        >
            {text}
        </button>
    )

}

export default Button;