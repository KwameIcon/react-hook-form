import { ReactNode } from "react";


type FormLayoutProps = {
    children: ReactNode,
    header: string
}


export default function FormLayout({ children, header }: FormLayoutProps) {

    return (
        <section className="w-full grid grid-cols-1 gap-2">
            <h1 className="text-2xl text-primary font-bold capitalize">
                {header}
            </h1>
            <hr className="w-full h[2px] bg-secondaryBackground" />
            <div>
                {children}
            </div>
        </section>
    )
}