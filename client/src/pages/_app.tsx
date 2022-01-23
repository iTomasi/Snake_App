// Next
import { useRouter } from "next/router";

// Components
import Header from "components/header/Header";
import Layout from "components/Layout";
import MainLayout from "components/MainLayout";
import { Toaster } from "react-hot-toast";

// Routes
import AuthRoute from "routes/AuthRoute.routes";
import ProtectRoute from "routes/ProtectRoute.routes";

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

        else if (Component.ProtectRoute) {
            return (
                <ProtectRoute>
                    <Component {...pageProps}/>
                </ProtectRoute>
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
                <Layout>
                    <TheComponent/>
                </Layout>
            </MainLayout>
        </UserState>
    )
}

export default App;