export const handleClickOutside = ({e, openDropdown, dropdownRefs, setOpenDropdown}: {
    e: MouseEvent;
    openDropdown: string | null;
    dropdownRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
    setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    if (openDropdown) {
        let clickedOutside = true;
        for (const key in dropdownRefs.current) {
            const ref = dropdownRefs.current[key];
            if (ref && ref.contains(e.target as Node)) {
                clickedOutside = false;
                break;
            }
        }
        if (clickedOutside) {
            setOpenDropdown(null);
        }
    }
};