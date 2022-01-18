// Next
import { useRouter } from "next/router";

// Components
import Header from "components/header/Header";
import MainLayout from "components/MainLayout";
import { Toaster } from "react-hot-toast";

// Context State
import UserState from "context/user/UserState";

import "css/App.css";

const App = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
        <UserState>
            <MainLayout>
                <Toaster/>
                {
                    !router.pathname.startsWith("/auth") && <Header/>
                }
                <Component { ...pageProps } />

            </MainLayout>
        </UserState>
    )
}

export default App;