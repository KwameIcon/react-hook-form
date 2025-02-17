import { GUARANTEESDATA } from "@/DATA/INSUARANCEDATA";
import { FaCheckCircle } from "react-icons/fa";

export default function Guarantees() {

    return (
        <ul className="w-full m-auto grid grid-cols-1 gap-5">
            {GUARANTEESDATA?.map(item => (
                <li className="flex items-center gap-3" key={item.id}>
                    <FaCheckCircle className="text-green-800 text-opacity-75" />
                    <span className="text-[14px] text-primary">{item.content}</span>
                </li>
            ))}
        </ul>
    )
}