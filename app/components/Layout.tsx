'use client'

import Link from "next/link";
import { ReactNode } from "react";
import ShoppingCart from "./ShoppingCart";
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
})

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({
    children
}: LayoutProps) => {
    return (
        <div className="flex flex-col w-screen h-screen">
            <nav className="flex items-center justify-center h-16 px-5 bg-black">
                <Link className="mr-auto" href="/">
                    <span className={`flex text-3xl text-white ${orbitron.variable} font-sans`}>restyle</span>
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
