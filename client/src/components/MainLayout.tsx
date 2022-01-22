import React, { useEffect } from "react";

// Components
import LottieLoader from "./LottieLoader";

// Hooks
import { useUser } from "hooks/useUser";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
    const { status } = useUser();

    return (
        <>
            {
                status === 0 && <LottieLoader/>
            }
            {children}
        </>
    )
};

export default MainLayout;