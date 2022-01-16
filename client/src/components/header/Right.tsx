import React from "react";

// Components
import Button from "../Button";

const Right = () => {
    return (
        <div className="iw-flex">
            <Button
                className="iw-bg-indigo-500 active:iw-bg-indigo-600 iw-mr-4"
                type="link"
                text="Sign In"
                href="/auth/sign-in"
            />

            <Button
                className="iw-bg-indigo-500 active:iw-bg-indigo-600"
                type="link"
                text="Sign Up"
                href="/auth/sign-up"
            />
        </div>
    )
};

export default Right;