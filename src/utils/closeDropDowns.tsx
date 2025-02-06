
type CloseDropDownsType = {
    e: MouseEvent;
    isNationalityOpen: boolean;
    isMonthOpen: boolean;
    isDayOpen: boolean;
    isYearOpen: boolean;
    nationalityRef: React.RefObject<HTMLDivElement | null>;
    monthRef: React.RefObject<HTMLDivElement | null>;
    dayRef: React.RefObject<HTMLDivElement | null>;
    yearRef: React.RefObject<HTMLDivElement | null>;
    setIsNationalityOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsMonthOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDayOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsYearOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


    // close dropdowns on click outside
    export const handleClickOutside = ({e, isNationalityOpen, isMonthOpen, isDayOpen, isYearOpen, nationalityRef, monthRef, dayRef, yearRef, setIsNationalityOpen, setIsMonthOpen, setIsDayOpen, setIsYearOpen}:CloseDropDownsType) => {
        if(isNationalityOpen || isMonthOpen || isDayOpen || isYearOpen){
            const nationalityContainer = nationalityRef.current;
            const monthContainer = monthRef.current;
            const dayContainer = dayRef.current;
            const yearContainer = yearRef.current;
            if((nationalityContainer || monthContainer || dayContainer || yearContainer) && (!nationalityContainer?.contains(e.target as Node) || !monthContainer?.contains(e.target as Node) || !dayContainer?.contains(e.target as Node) || !yearContainer?.contains(e.target as Node))){
                setIsNationalityOpen(false);
                setIsMonthOpen(false);
                setIsDayOpen(false);
                setIsYearOpen(false);
            }
        }
    }