import React from "react";

const theClassName: string = "3px solid";

interface ISpinnerLoaderProps {
    color?: string;
}

const SpinnerLoader = ({ color = "#FFFFFF" }: ISpinnerLoaderProps) => {
    return (
        <div className="iw-w-5 iw-h-5 iw-rounded-full iw-animate-spin" style={{
            borderTop: `${theClassName} ${color}`,
            borderRight: `${theClassName} ${color}`,
            borderBottom: `${theClassName} ${color}`,
            borderLeft: `${theClassName} transparent`
        }}>

        </div>
    )
}

export default SpinnerLoader;