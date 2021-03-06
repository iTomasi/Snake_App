import React from "react";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
    return (
        <main className="iw-w-11/12 iw-max-w-screen-xl iw-mx-auto iw-py-4">
            {children}
        </main>
    )
};

export default Layout;