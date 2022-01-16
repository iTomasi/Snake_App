import React from "react";

// Next
import Link from "next/link";

const Left = () => {
    return (
        <div>
            <Link href="/">
                <a className="iw-block iw-w-12 iw-h-12">
                    <img
                        className="iw-w-full iw-h-full iw-object-cover iw-object-center iw-rounded-full"
                        src="/img/logo.svg"
                        alt="logo"
                    />
                </a>
            </Link>
            
        </div>
    )
}

export default Left;