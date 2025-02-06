"use client";

import { FORMPROGRESSDATA } from "@/DATA/FORMPROGRESSDATA";
import { useState } from "react";
import { FaCheck, FaFileContract } from "react-icons/fa";

export default function FormProgress() {
    const [currentStep] = useState(3);
    const length = FORMPROGRESSDATA.length;


    // Handle the next step navigation
    // const handlePrevStep = () => {
    //     if (currentStep >= length) {
    //         return;
    //     }
    //     setCurrentStep((prev) => prev + 1);
    // };


    // Update state of each form based on the current step
    const updateStepState = (index: number) => {
        if (index + 1 < currentStep) return "completed";
        if (index + 1 === currentStep) return "in-progress";
        return "pending";
    };

    // Calculate percentages for the progress bar
    const completedPercentage = ((currentStep - 1) / length) * 100;
    const inProgressPercentage = (1 / length) * 100;
    const pendingPercentage = 100 - completedPercentage - inProgressPercentage;

    return (
        <section className="w-full h-auto">
            {/* Desktop Progress */}
            <ul className="hidden w-full lg:flex lg:items-start lg:justify-between lg:gap-3">
                {FORMPROGRESSDATA.map((form, i) => {
                    const stepState = updateStepState(i);
                    return (
                        <li className="w-60 lg:w-52 flex items-start gap-2 text-sm" key={form.id}>
                            <div className={`w-6 h-6 rounded rounded-br-xl flex items-center justify-center ${stepState === "completed" ? "bg-green-800 text-white" : "bg-gray-300 text-gray-500"}`}>
                                {stepState === "completed" ? (<FaCheck />) : stepState === "in-progress" ? (<div className="w-[70%] h-[70%] rounded rounded-br-xl bg-primary" />) : form.state === "Download it" ? ( <FaFileContract />) : null}
                            </div>

                            {/* Step Content */}
                            <div className="w-56 grid grid-cols-1">
                                <div className="w-full flex items-center gap-8">
                                    <p className="shrink-0 capitalize text-xs">{form.step}</p>
                                    <div className="w-full flex items-end">
                                        {i + 1 < length && (
                                            <hr className={`w-full h-[2px] ${stepState === "completed" ? "bg-green-800" : stepState === "in-progress" ? "bg-primary" : "bg-gray-300"}`} />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1">
                                    <h3 className="text-primary font-bold text-sm capitalize">
                                        {form.title}
                                    </h3>
                                    <p className={`${stepState === "completed" ? "text-green-800" : stepState === "in-progress" ? "text-primary" : "text-gray-300"} text-[0.7rem]`}>
                                        {form.state === "Download it" ? "Download it" : stepState === "in-progress" ? "In Progress" : stepState === "completed" ? "Completed" : "Pending"}
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Mobile Progress Bar */}
            <div className="w-11/12 m-auto h-[10px] my-10 rounded-full box-border bg-gray-200 lg:hidden flex">


                {/* Completed Bar */}
                {completedPercentage !== 0 && <span style={{ width: `${completedPercentage}%` }} className="h-full rounded-l-full bg-green-800 relative after:content-['Complete'] after:absolute after:-bottom-5 after:text-xs after:text-green-800 after:capitalize" />}


                {/* In-Progress Bar */}
                <span style={{ width: `${inProgressPercentage}%` }} className={`h-full bg-primary relative after:content-['In_Progress'] after:absolute ${completedPercentage === 0 ? "rounded-l-full" : ""} ${pendingPercentage === 0 ? "rounded-r-full" : ""} after:-bottom-5 after:text-xs after:text-primary after:capitalize`} />


                {/* Pending Bar */}
                {pendingPercentage !== 0 && <span style={{ width: `${pendingPercentage}%` }} className="h-full rounded-l-full bg-transparent relative after:content-['Pending'] after:absolute after:-bottom-5 after:text-xs after:text-gray-300 after:capitalize" />}
            </div>


            {/* <button className="p-1 px-5 bg-blue-700 text-white text-xl" onClick={handlePrevStep}>Next</button> */}


        </section>
    );
}
