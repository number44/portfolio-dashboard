import React, { ReactChild, ReactNode } from "react";
interface PropsI {
    children: ReactNode;
}
const Layout = ({ children }: PropsI) => {
    return (
        <main className="dark:bg-slate-700 ml-48 px-4 pt-20 min-h-screen mb-40">
            {children}
        </main>
    );
};

export default Layout;
