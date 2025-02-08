"use client"
import { LANGUAGES } from "@/DATA/LANGUAGES";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { FaAngleDown, FaTimes } from "react-icons/fa";

type LanguageType = {
    id: number,
    flag: StaticImageData,
    language: string,
    short: string,
}


export default function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>({
        id: LANGUAGES[0].id,
        flag: LANGUAGES[0].flag,
        language: LANGUAGES[0].language,
        short: LANGUAGES[0].short,
    })
    const [isLanguage, setIsLanguage] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    const handlePageResize = () => {
        setIsMobile(window.innerWidth <= 500);
    }


    useEffect(() => {
        handlePageResize();
        window.addEventListener('resize', handlePageResize);
        return (() => {
            window.removeEventListener('resize', handlePageResize)
        })
    }, [])


    const handleLanguageChange = (language: LanguageType) => {
        setSelectedLanguage(language);
        setIsLanguage((prev) => !prev);
    }

    return (
        <div className={`w-full h-full xl:relative flex items-center justify-center p-2`}>


            <div className="dropdown">


                <button className="flex items-center gap-2 cursor-pointer" onClick={() => setIsLanguage((prev) => !prev)}>
                    <Image src={selectedLanguage.flag} alt={selectedLanguage.language} width={20} height={20} className="w-auto h-auto" />
                    <span className="flex gap-1 items-center"> <span className="text-primary/60">{!isMobile ? selectedLanguage.language : selectedLanguage.short}</span> <span className="text-primary"><FaAngleDown /></span></span>
                </button>


                {isLanguage &&
                    <div className={`flex flex-col items-start justify-start bg-white animate-animateFromRight ${isMobile ? "fixed w-screen h-screen" : "absolute"} z-50 top-0 md:top-[100%] left-0 w-screen h-screen md:h-auto md:left-[70%] xl:-left-32 md:w-[30%] xl:w-64 shadow rounded overflow-hidden `}>
                        <h1 className="w-10/12 m-auto flex items-center justify-between text-primary font-bold text-xl my-5 md:hidden">
                            <span>Select your language</span>
                            <FaTimes className="" onClick={() => setIsLanguage(prev => !prev)} />
                        </h1>
                        <div className="w-full grid grid-cols-1 gap-1">
                            {LANGUAGES.map((lan) => (
                                <div key={lan.id} className="w-full h-10 flex items-center justify-start gap-2 cursor-pointer transition-all duration-200 ease-linear hover:bg-gray-50 px-3 text-primary/40 hover:text-primary md:text-sm" onClick={() => handleLanguageChange(lan)}>
                                    <Image src={lan.flag} alt={lan.language} width={20} height={20} className="w-auto h-auto" />
                                    {lan.language}
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}