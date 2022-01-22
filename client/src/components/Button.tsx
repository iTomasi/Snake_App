import React from "react";

// Next
import Link from "next/link";

// Components
import SpinnerLoader from "./SpinnerLoader";

interface IButtonProps {
    className?: string;
    type?: "submit" | "button" | "link";
    text: string;
    href?: string;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const buttonClassName: string = "iw-flex iw-items-center iw-justify-center iw-px-4 iw-min-h-[2.7rem] iw-rounded iw-text-center"

const Button = ({ className = "", type = "submit", text, href = "#", loading = false, onClick }: IButtonProps) => {
    if (type !== "link" && href !== "#") throw new Error(`<Button type="${type}"/> can't use href props if your button is type: ${type}`)
    else if (type !== "button" && onClick) throw new Error(`<Button type="${type}"/> can't use onClick props if your button is type: ${type}`)

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
            disabled={loading}
            onClick={onClick}
        >
            {
                loading
                ? <SpinnerLoader/>
                : text
            }
        </button>
    )

}

export default Button;