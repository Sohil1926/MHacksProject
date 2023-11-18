import { Navbar } from "@/components/Navbar";

export default function LaunchPage() {
    return (
        <div>
            <Navbar />
        <div className="container mx-auto p-6">
            <h5 className="text-2xl mt-11 text-black text-center mb-6 font-poppins">Dream your event to life. We take care of venues, food, <br></br> and everything in between. </h5>
            <div className="grid grid-cols-2 gap-4 mt-11">
                <div className="p-3 bg-white rounded">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3">1</div>
                        <label htmlFor="input1" className="text-sm font-medium text-black">What type of event are you organizing?</label>
                    </div>
                    <input type="text" id="input1" className="mt-4 block w-full p-2 border border-gray-300 rounded text-black" />
                </div>
                <div className="p-3 bg-white rounded">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3">2</div>
                        <label htmlFor="input2" className="text-sm font-medium text-black">How long is the event?</label>
                    </div>
                    <input type="text" id="input2" className="mt-4 w-full block p-2 border border-gray-300 rounded text-black" />
                </div>
                <div className=" p-3 bg-white rounded">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3">3</div>
                        <label htmlFor="input3" className="text-sm font-medium text-black">What's your total budget?</label>
                    </div>
                    <input type="text" id="input3" className="mt-4 block w-full p-2 border border-gray-300 rounded text-black" />
                </div>
                <div className=" p-3 bg-white rounded">
                    <div className="flex items-center">
                        <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3">4</div>
                        <label htmlFor="input4" className="text-sm font-medium text-black">Which city?</label>
                    </div>
                    <input type="text" id="input4" className="mt-4 block w-full p-2 border border-gray-300 rounded text-black" />
                </div>
            </div>
            <button className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 font-poppins rounded shadow-lg transition-colors duration-300">
                dream.
            </button>
        </div>
        </div>
    )

}