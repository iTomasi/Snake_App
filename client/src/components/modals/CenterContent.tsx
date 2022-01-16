import React from "react";

interface ICenterContentProps {
    children: React.ReactNode;
}

const CenterContent = ({ children }: ICenterContentProps) => {
    return (
        <div className="iw-w-screen iw-h-screen iw-flex iw-justify-center iw-items-center">
            {children}
        </div>
    )
}

export default CenterContent;