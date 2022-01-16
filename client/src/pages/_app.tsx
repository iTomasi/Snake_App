// Components
import Header from "components/header/Header";

import "css/App.css";

const App = ({ Component, pageProps }) => {
    return (
        <>
        <Header/>
        <Component { ...pageProps } />
        </>
    )
}

export default App;