import { FaCalendar, FaFlag, FaPaperclip, FaTags } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

export default function InsuranceSummaryPlan() {

    return (
        <div className="w-full grid grid-cols-2 gap-4 text-xs md:text-sm">
            <ul className="w-full grid grid-cols-1 gap-4">
                <li className="flex items-center  gap-16">
                    <div className="flex items-center gap-2">
                        <FaPaperclip />
                        <span>Plan: </span>
                    </div>
                    {/* <p className="text-primary/50"> Mutuaide Basic</p> */}
                </li>
                <li className="flex items-center  gap-16">
                    <div className="flex items-center gap-2">
                        <FaCalendar />
                        <span>Departure date: </span>
                    </div>
                    {/* <p className="text-primary/50">18/02/2025</p> */}
                </li>
                <li className="flex items-center  gap-16">
                    <div className="flex items-center gap-2">
                        <FaCalendar />
                        <span>Return date: </span>
                    </div>
                    {/* <p className="text-primary/50"> 18/02/2025</p> */}
                </li>
                <li className="flex items-center  gap-16">
                    <div className="flex items-center gap-2">
                        <FaFlag />
                        <span>Departure country: </span>
                    </div>
                    {/* <p className="text-primary/50">Ghana</p> */}
                </li>
                <li className="flex items-center  gap-16">
                    <div className="flex items-center gap-2">
                        <FaFlag />
                        <span>Arrival country: </span>
                    </div>
                    {/* <p className="text-primary/50">Australia</p> */}
                </li>
                <li className="flex items-center  gap-16">
                    <div className="flex items-center gap-2">
                        <FaUser />
                        <span>Number of travelers: </span>
                    </div>
                    {/* <p className="text-primary/50">5</p> */}
                </li>
                <li className="flex items-center  gap-16">
                    <div className="flex items-center gap-2">
                        <FaTags />
                        <span>Price (tax included): </span>
                    </div>
                    {/* <p className="text-primary/50">$114.89 (for all travelers)</p> */}
                </li>
            </ul>
            <ul className="w-full grid grid-cols-1 gap-4 text-primary/50">
                <li>Mutuaide Annual Lite</li>
                <li>16/02/2025</li>
                <li>18/02/2025</li>
                <li>Ghana</li>
                <li>Argentina</li>
                <li>5</li>
                <li>$114.89 (for all travelers)</li>
            </ul>
        </div>
    )
}