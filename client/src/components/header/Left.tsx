import React from "react";

// Next
import Link from "next/link";
import dynamic from "next/dynamic";

// Components
const Navigation = dynamic(() => import("./Navigation"), { ssr: false })

const Left = () => {
    return (
        <div className="iw-flex iw-items-center">
            <Link href="/">
                <a className="iw-block iw-w-12 iw-h-12 iw-mr-6">
                    <img
                        className="iw-w-full iw-h-full iw-object-cover iw-object-center iw-rounded-full"
                        src="/img/logo.svg"
                        alt="logo"
                    />
                </a>
            </Link>

            <Navigation/>
        </div>
    )
}

export default Left;