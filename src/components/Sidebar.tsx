import React, { useState } from "react";
import { Link } from "react-router-dom";
interface PropsI {}
const Sidebar = ({}: PropsI) => {
    return (
        <aside className="fixed top-0 left-0 w-48 overflow-x-hidden z-10 h-full pt-16 shadow-lg   bg-white dark:bg-slate-800 dark:text-zinc-300 ">
            <Link to="/">
                <div className=" link uppercase flex leading-8 bg-gray-700 m p-2 font-medium">
                    <span>Notes</span>
                </div>
            </Link>
            <Link to="/about">
                <div className="link uppercase flex leading-8 bg-gray-700 m p-2 font-medium hover:bg-slate-700">
                    <span>Media</span>
                </div>
            </Link>
        </aside>
    );
};

export default Sidebar;

// aside {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 160px;
//     overflow-x: hidden;
//     z-index: 1;
//     background: #2c2c2c;
//     padding-top: 70px;
//     height: 100%;
//     color: #ddd;
// }
