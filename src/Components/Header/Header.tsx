"use client"

import { useEffect, useState } from "react";
import { Logo } from "../Commons";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

export default function Header() {

    // states
    const [isFixed, setIsFixed] = useState(false);



    // display header fix on scroll
    const handleHeaderFixedOnScroll = () => {
        const scrollLimit = 100;
        setIsFixed(window.scrollY > scrollLimit);
    }


    // display header fix on scroll
    useEffect(() => {
        window.addEventListener("scroll", handleHeaderFixedOnScroll);
        return () => {
            window.removeEventListener("scroll", handleHeaderFixedOnScroll);
        };
    }, []);



    return (
        <section className={`w-full px-3 xl:px-2 h-16 ${isFixed ? 'fixed top-0 w-full lg:w-screen xl:w-10/12 xxl:w-3/5 m-auto z-50 bg-white shadow shadow-primary/30 animate-animateTop' : 'relative'} flex items-center justify-between`}>

            {/* Logo */}
            <div className="w-auto h-full flex items-center justify-center">
                <Logo />
            </div>

            {/* Language */}
            <div className="grid grid-cols-1 place-items-start">
                <LanguageSelector />
            </div>

        </section>
    )
}