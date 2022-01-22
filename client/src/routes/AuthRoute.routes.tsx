import React, { useEffect } from "react";

// Components
import LottieLoader from "components/LottieLoader";

// Next
import { useRouter } from "next/router";

// Hooks
import { useUser } from "hooks/useUser";

interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute = ({ children }: IAuthRouteProps) => {
    const router = useRouter();
    const { status } = useUser();

    useEffect(() => {
        if (status === 0) return
        else if (status === 2) {
            console.log("no logged")
            return
        }

        router.push("/");
    }, [status])

    return (
        <>
            {
                (status === 0 || status === 1) && <LottieLoader/>
            }
            {children}
        </>
    )
};

export default AuthRoute;