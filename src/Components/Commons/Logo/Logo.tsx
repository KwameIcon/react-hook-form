import Image from "next/image";
import logo from "../../../../public/logo-insurte.webp";

type LogoProps = {
    className?: string;
}

export default function Logo ({className}: LogoProps) {

    return (
        <div className={`w-28 overflow-hidden ${className}`}>
            <Image src={logo} alt="Logo" className="w-full h-full"/>
        </div>
    )
}