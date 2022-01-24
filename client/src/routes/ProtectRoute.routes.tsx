import React, { useEffect } from "react";

// Components
import LottieLoader from "components/LottieLoader";

// Next
import { useRouter } from "next/router";

// Hooks
import { useUser } from "hooks/useUser";

interface IProtectRouteProps {
    children: React.ReactNode;
}

const ProtectRoute = ({ children }: IProtectRouteProps) => {
    const { status } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (status === 0 || status === 1) return

        router.push("/auth/sign-in")
    }, [status])

    return (
        <>
        {
            status !== 1 && <LottieLoader/>
        }
        {children}
        </>
    )
}

export default ProtectRoute;