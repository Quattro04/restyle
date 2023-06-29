'use client'

import Link from "next/link";
import { ReactNode } from "react";
import ShoppingCart from "./ShoppingCart";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({
    children
}: LayoutProps) => {
    return (
        <div className="flex flex-col w-screen h-screen">
            <nav className="flex items-center justify-center h-16 px-5 bg-teal-300">
                <Link className="mr-auto" href="/">
                    <span className="flex text-xl text-red">ReSTYLE</span>
                </Link>
                <div className="ml-auto">
                    <ShoppingCart />
                </div>
            </nav>
            {children}
        </div>
    )
}

export default Layout;
