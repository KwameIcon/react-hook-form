
import { INSUARANCESUMMARYDATA } from "@/DATA/INSUARANCEDATA";

export default function InsuranceSummaryPlan() {

    return (
        <div className="w-full grid grid-cols-1 gap-4 text-xs md:text-sm">
            <ul className="w-full grid grid-cols-1 gap-4">
                {INSUARANCESUMMARYDATA?.map(item => (
                    <li className="w-full flex items-center  gap-16" key={item.id}>
                        <div className="w-1/2 flex items-center gap-2">
                            <item.icon />
                            <span>{item.content.key}: </span>
                        </div>

                        <div className="w-1/2 text-primary/50">{item.content.value}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}