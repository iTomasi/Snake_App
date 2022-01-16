import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head/>

                <body className="iw-bg-stone-900 iw-text-white iw-text-lg">
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
};

export default MyDocument;