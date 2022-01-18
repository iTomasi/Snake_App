import React, { useEffect } from "react";

// Hooks
import { useUser } from "hooks/useUser";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
    const { user } = useUser();

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <>
            {children}
        </>
    )
};

export default MainLayout;