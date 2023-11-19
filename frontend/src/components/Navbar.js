import React from 'react';

export const Navbar = () => {
    return (
        <nav className="bg-white p-2 mt-0 w-full">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="flex w-full md:w-1/2 justify-center md:justify-start text-black">
                    <a className="text-black no-underline hover:text-black hover:no-underline font-poppins" href="#">
                        <span className="text-2xl pl-2 font-bold">magic</span>
                        <span className="text-2xl font-light"> events</span>
                    </a>
                </div>
                <div className="flex w-full md:w-1/2 justify-center md:justify-end text-black">
                    <a href="http://localhost:3000/company-dashboard">
                        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700">
                            for companies
                        </button>
                    </a>
                </div>
            </div>
        </nav>
    );
}
