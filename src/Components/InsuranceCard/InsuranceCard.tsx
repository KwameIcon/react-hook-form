"use client"
import { useState } from "react";
import InsuranceSummaryPlan from "../InsuranceSummary/InsuaranceSummaryPlan";
import Guarantees from "../Guarantees/Guarantees";
import { FieldValues, useFormContext } from "react-hook-form";



type InsuranceCardProps = {
    onSubmit: (data:FieldValues) => void;
}



export default function InsuranceCard({onSubmit}: InsuranceCardProps) {
    const [isInsuranceSummary, setIsInsuranceSummary] = useState(true);
    const [isGuarantee, setIsGuarantee] = useState(false);
    const [isTermsAgreed, setIsTermsAgreed] = useState(false);

    const {handleSubmit} = useFormContext();


    // toggle sections
    const handleSectionsToggle = (section: string) => {
        setIsInsuranceSummary(false);
        setIsGuarantee(false);
        if (section === "summary") {
            setIsInsuranceSummary(true);
        } else if (section === "guarantee") {
            setIsGuarantee(true);
        }
    }


    return (
        <div className="w-11/12 md:w-10/12 lg:w-[28rem] h-auto m-auto bg-secondaryBackground/30 rounded-lg p-2 md:p-4 grid gap-5 grid-cols-1 border border-primaryBorder md:mt-10 lg:mt-0">
            <h1 className="text-2xl font-bold">Your insurance</h1>

            <div className="w-full flex items-center justify-center gap-6 border-b border-primary/30 text-sm text-primary/50">
                <div className={`cursor-pointer ${isInsuranceSummary ? 'text-primary border-b border-primary font-bold' : ''}`} onClick={() => handleSectionsToggle("summary")}>Summary</div>
                <div className={`cursor-pointer ${isGuarantee ? 'text-primary border-b border-primary font-bold' : ''}`} onClick={() => handleSectionsToggle("guarantee")}>Guarantees</div>
                <div className={`cursor-pointer`}>IPID + Terms</div>
            </div>

            <div className="w-11/12 m-auto">
                {isInsuranceSummary && <InsuranceSummaryPlan />}
                {isGuarantee && <Guarantees />}
            </div>


            <div className="w-11/12 m-auto grid grid-cols-1 gap-2">
                <p className="text-primary font-semibold">Would you like to activate the free annual renewal option?</p>
                <div className="w-full border border-green-500 border-opacity-30 p-2 px-4 h-14 rounded-xl flex items-center gap-3">
                    <input type="checkbox" name="activate" id="activate" /> <label htmlFor="activate">Yes, activate the annual renewal</label>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
                <button type="submit" className="w-10/12 m-auto h-12 bg-primary rounded-full text-white flex items-center justify-center">Confirm my insurance</button>
            </form>

            <div className="grid grid-cols-1 font-light">
                <p className="w-full text-[10px] text-primary">By clicking &apos;CONFIRM MY INSURANCE&apos;, I accept the global consent: pre-contractual information notice, the insurance IPID, the General Conditions, the Terms of Use, the Legal Notice, the Privacy Policy, the Cookies Policy, and the Disclaimer.</p>

                <div className="flex items-center justify-center gap-2">
                    <button className={`w-16 m-auto h-5 ${isTermsAgreed ? "bg-primary" : 'bg-white border border-primary'} rounded-full text-white flex items-center justify-center relative after:absolute after:z-10 after:w-6/12 after:h-3/5 ${isTermsAgreed ? "after:bg-white after:right-1" : "after:bg-primary after:left-1"} after:rounded-full `} onClick={() => setIsTermsAgreed(!isTermsAgreed)} />
                    <p className="w-full text-[10px] text-primary">I agree that Insurte and its partners can use my personal data to send me, including by email, information about their products and services, according to Insurte&apos;s Privacy Policy.</p>
                </div>
            </div>
        </div>
    )
};