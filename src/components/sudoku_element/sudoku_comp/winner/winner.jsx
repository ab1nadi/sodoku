import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'

export default function Winner()
{
   // so the confetti is displayed the whole window
   let [width, height] = useWindowSize();

    return(
        <div className="fixed flex w-screen h-screen  z-20 justify-center items-center bg-slate-800 bg-opacity-75">
            <Confetti
            width={width}
            height={height}
            />
            <div className=" text-7xl text-white">You Win!!</div>
        </div>
    )
}