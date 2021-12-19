import React from "react";
import Toogle from "./Toogle";
interface PropsI {}
const Navbar = ({}: PropsI) => {
    return (
        <header>
            <nav className="dark:bg-gray-800 dark:text-zinc-100 max-6xl mx-auto bg-white shadow-sm w-full h-16 fixed top-0 flax">
                <div className="brand h-full flex justify-end px-8  items-center">
                    <Toogle />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
