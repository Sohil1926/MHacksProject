import Lottie from "lottie-react";
import anim from "../assets/lottie.json";

export default function Loading() {
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h6 className="text-2xl text-black">Using some magic...</h6>
        <Lottie className='mt-10' animationData={anim} />
      </div>
      </div>
}