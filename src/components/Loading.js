import React, { useContext, useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { AuthContext } from '../context/AuthContext';
function Loading() {
    const [ScreenSize, setScreenSize] = useState(false)
    const { isLoading } = useContext(AuthContext)
    console.log("loading", isLoading)
    let screensize = window.screen.width
    useEffect(() => {
        if (screensize < 500) {
            setScreenSize(true)
        } else {
            setScreenSize(false)
        }
    }, [screensize])


    return (
        <>
            {isLoading ? <div className="fixed z-[1000] top-0 bg-black/50 w-full h-screen overflow-hidden flex justify-center items-center">
                <ReactLoading type={"spinningBubbles"} color={"white"} height={ScreenSize ? 100 : 200} width={ScreenSize ? 100 : 200} />

            </div> : <></>
            }
        </>

    )
}

export default Loading