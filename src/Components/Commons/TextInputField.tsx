"use client"
import React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
};

export default function TextInputField({ className, ...rest }: FormInputProps) {
    return (
        <input {...rest} className={`bg-secondaryBackground/30 border border-blue-300 rounded outline-primary w-full h-9 px-2 ${className || ""}`}/>
    );
}
