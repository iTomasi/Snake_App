// Next
import { useRouter } from "next/router";

// Components
import Header from "components/header/Header";
import MainLayout from "components/MainLayout";
import { Toaster } from "react-hot-toast";

// Routes
import AuthRoute from "routes/AuthRoute.routes";

// Context State
import UserState from "context/user/UserState";

import "css/App.css";

const App = ({ Component, pageProps }) => {
    const router = useRouter();

    const TheComponent = () => {
        if (Component.AuthPage) {
            return (
                <AuthRoute>
                    <Component {...pageProps}/>
                </AuthRoute>
            )
        }

        return <Component {...pageProps}/>
    }

    return (
        <UserState>
            <MainLayout>
                <Toaster/>
                {
                    !router.pathname.startsWith("/auth") && <Header/>
                }
                <TheComponent/>
            </MainLayout>
        </UserState>
    )
}

export default App;