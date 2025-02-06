import { ReactNode } from "react"

type PrimaryCardProps = {
    children: ReactNode,
    className?: string;
}

export default function PrimaryCard ({children, className}:PrimaryCardProps) {

    return(
        <div className={`w-auto h-auto p-3 rounded-xl overflow-hidden bg-secondaryBackground ${className}`}>
            {children}
        </div>
    )
}