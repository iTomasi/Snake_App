import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import lottieLoader from "assets/lottie_loader.json";

const LottieLoader = () => {
    const divRef = useRef<HTMLDivElement>()

    useEffect(() => {
        lottie.loadAnimation({
            container: divRef.current,
            animationData: lottieLoader,
            loop: true,
            autoplay: true,
        })
    }, [])

    return (
        <div className="iw-bg-stone-900 iw-fixed iw-inset-0 iw-z-50 iw-flex iw-justify-center iw-items-center">
            <div className="iw-w-11/12 iw-max-w-sm" ref={divRef}>
            </div>
        </div>
    )

}

export default LottieLoader;