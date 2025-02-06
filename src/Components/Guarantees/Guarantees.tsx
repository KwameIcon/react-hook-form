import { FaCheckCircle } from "react-icons/fa";

export default function Guarantees() {

    return(
        <ul className="w-full m-auto grid grid-cols-1 gap-5">
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Medical Expenses abroad up to €100,000</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Medical Repatriation</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">24/7 Travel Assistance</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Covid-19</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">All epidemics</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Epidemic Quarantine Costs</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Sports (search and rescue costs)</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Legal fees abroad & Advance of bail abroad</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Legal Assistance</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Assistance for loss or theft abroad</span>
            </li>
            <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-800 text-opacity-75"/>
                <span className="text-[14px] text-primary">Psychological Assistance</span>
            </li>
        </ul>
    )
}