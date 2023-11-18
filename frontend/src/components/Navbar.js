import React from 'react';

export const Navbar = () => {
    return (
        <nav className="bg-white p-2 mt-0 w-full"> 
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="flex w-full md:w-1/2 justify-center md:justify-start text-black">
                    <a className="text-black no-underline hover:text-black hover:no-underline font-poppins" href="#">
                        {/* Logo text with different styles for "Magic" and "Events" */}
                        <span className="text-2xl pl-2 font-bold">magic</span>
                        <span className="text-2xl font-light"> events</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}