import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import logo from "../logo.png";

const unityContext = new UnityContext({
    loaderUrl: "build/Build/WebGL.loader.js",
    dataUrl: "build/Build/WebGL.data.unityweb",
    frameworkUrl: "build/Build/WebGL.framework.js.unityweb",
    codeUrl: "build/Build/WebGL.wasm.unityweb"
});

function Home() {
    const [percent, setPercent] = useState(false);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        unityContext.on("progress", (progress) => {
            setProgress(progress * 1.11 * 100);
            if (progress === 1) {
                setPercent(true);
            }
        })
    }, [])
    return (
        <div>
            {!percent && (
                <div className="wait">
                    <img src={logo}></img>
                    <div className="percent">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}
            <Unity
                unityContext={unityContext}
                matchWebGLToCanvasSize={true}
                style={{ height: "99vh" }}
            />
        </div>
    );
}

export default Home