// Next
import { useRouter } from "next/router";

// Components
import Header from "components/header/Header";

import "css/App.css";

const App = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
        <>
        {
            !router.pathname.startsWith("/auth") && <Header/>
        }
        <Component { ...pageProps } />
        </>
    )
}

export default App;