// Next
import { useRouter } from "next/router";

// Components
import Header from "components/header/Header";
import { Toaster } from "react-hot-toast";

import "css/App.css";

const App = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
        <>
        <Toaster/>
        {
            !router.pathname.startsWith("/auth") && <Header/>
        }
        <Component { ...pageProps } />
        </>
    )
}

export default App;