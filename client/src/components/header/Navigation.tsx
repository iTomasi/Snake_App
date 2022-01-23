import React, { useState, useEffect } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
    { name: "Play", href: "/play" },
    { name: "Leaderboard", href: "/leaderboard" }
]

const Navigation = () => {
    const router = useRouter();
    const [pathname, setPathname] = useState<string>(window.location.pathname);

    useEffect(() => {
        setPathname(window.location.pathname);
    }, [router])

    return (
        <nav>
            <ul className="iw-flex">
                {
                    navigation.map((value, index) => (
                        <li className="iw-mr-4 last:iw-mr-0" key={index}>
                            <Link href={value.href}>
                                <a className={`iw-block ${value.href === pathname ? "iw-text-white" : "iw-text-gray-400"}`}>
                                    {value.name}
                                </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}

export default Navigation;